import { Vector3 } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Sun from "components/Sun";
import Earth from "components/Earth";

import useStyles from "./SceneStyles";

const EARTH_PARAMETERS = {
  atmosphereDayColor: "#00aaff",
  atmosphereTwilightColor: "#ff6600",
  atmosphereCloudsDensityNormalized: 0.3,
};

const SUN_POSITION = new Vector3(0, 0, 1);

const Scene = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Canvas camera={{ position: [12, 5, 4], fov: 25 }}>
        <Earth {...EARTH_PARAMETERS} sunPosition={SUN_POSITION} />
        <Sun position={SUN_POSITION} />
        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
};

export default Scene;
