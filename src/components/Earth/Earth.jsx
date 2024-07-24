import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide, Color, TextureLoader } from "three";

import earthVertexShader from "shaders/earth/vertex.glsl";
import earthFragmentShader from "shaders/earth/fragment.glsl";
import atmosphereVertexShader from "shaders/atmosphere/vertex.glsl";
import atmosphereFragmentShader from "shaders/atmosphere/fragment.glsl";

const SPHERE_GEOMETRY_VALUES = [2, 64, 64];

const Earth = ({
  atmosphereDayColor,
  atmosphereTwilightColor,
  atmosphereCloudsDensityNormalized,
  sunPosition,
}) => {
  const earthRef = useRef();
  const atmosphereRef = useRef();
  const [textures, setTextures] = useState(null);

  useEffect(() => {
    const textureLoader = new TextureLoader();
    const loadTextures = async () => {
      const day = await textureLoader.loadAsync("/textures/earth/day.jpg");
      const night = await textureLoader.loadAsync("/textures/earth/night.jpg");
      const specularClouds = await textureLoader.loadAsync(
        "/textures/earth/specular-clouds.jpg"
      );

      setTextures({ day, night, specularClouds });
    };

    loadTextures();
  }, []);

  useFrame(({ clock }) => {
    if (!earthRef.current) {
      return;
    }

    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime * 0.1;
  });

  const atmosphereDayColorValue = useMemo(
    () => new Color(atmosphereDayColor),
    [atmosphereDayColor]
  );

  const atmosphereTwilightColorValue = useMemo(
    () => new Color(atmosphereTwilightColor),
    [atmosphereTwilightColor]
  );

  if (!textures) {
    return null;
  }

  return (
    <>
      <mesh ref={earthRef}>
        <sphereGeometry args={SPHERE_GEOMETRY_VALUES} />
        <shaderMaterial
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={{
            uDayTexture: {
              value: textures.day,
            },
            uNightTexture: {
              value: textures.night,
            },
            uSpecularCloudsTexture: {
              value: textures.specularClouds,
            },
            uSunDirection: { value: sunPosition },
            uAtmosphereDayColor: {
              value: atmosphereDayColorValue,
            },
            uAtmosphereTwilightColor: {
              value: atmosphereTwilightColorValue,
            },
            uAtmosphereCloudsDensityNormalized: {
              value: 1 - atmosphereCloudsDensityNormalized,
            },
          }}
        />
      </mesh>
      <mesh ref={atmosphereRef} scale={1.015}>
        <sphereGeometry args={SPHERE_GEOMETRY_VALUES} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          side={BackSide}
          transparent
          uniforms={{
            uSunDirection: { value: sunPosition },
            uAtmosphereDayColor: {
              value: atmosphereDayColorValue,
            },
            uAtmosphereTwilightColor: {
              value: atmosphereTwilightColorValue,
            },
          }}
        />
      </mesh>
    </>
  );
};

export default Earth;
