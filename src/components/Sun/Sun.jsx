import { useRef, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare";

const Sun = ({ position }) => {
  const { scene } = useThree();
  const lensflareRef = useRef();
  const [textures, setTextures] = useState(null);

  useEffect(() => {
    const textureLoader = new TextureLoader();
    const loadTextures = async () => {
      const flare0 = await textureLoader.loadAsync(
        "/textures/sun/lensflare0.png"
      );
      const flare3 = await textureLoader.loadAsync(
        "/textures/sun/lensflare3.png"
      );

      setTextures({ flare0, flare3 });
    };

    loadTextures();
  }, []);

  useEffect(() => {
    if (!textures) {
      return;
    }

    const lensflare = new Lensflare();

    lensflare.addElement(new LensflareElement(textures.flare0, 700, 0));
    lensflare.addElement(new LensflareElement(textures.flare3, 60, 0.14));
    lensflare.addElement(new LensflareElement(textures.flare3, 120, 0.29));

    lensflareRef.current = lensflare;

    scene.add(lensflare);

    return () => {
      scene.remove(lensflare);
    };
  }, [scene, textures]);

  useEffect(() => {
    if (lensflareRef.current) {
      const positionCloned = position.clone().multiplyScalar(6);
      lensflareRef.current.position.copy(positionCloned);
    }
  }, [position, textures]);

  return <></>;
};

export default Sun;
