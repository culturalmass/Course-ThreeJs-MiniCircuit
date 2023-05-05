import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import Car from "./Car";
import Ground from "./Ground";
import Track from "./Track,";

const Scene = () => {
  const [thirdPerson, setThirdPerson] = useState(true);
  const [cameraPosition, setcameraPosition] = useState([-6, 3.9, 6.21]);

  useEffect(() => {
    function keydownHandler(e) {
      if (e.key === "k") {
        if (thirdPerson)
          setcameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
        setThirdPerson(!thirdPerson);
      }
    }
    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [thirdPerson]);
  return (
    <>
      <Suspense fallback={null}>
        <Environment files={"/textures/envmap.hdr"} background={"both"} />
        <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />

        <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
        {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}

        <Track />
        <Ground />
        <Car thirdPerson={thirdPerson} />
      </Suspense>
    </>
  );
};

export default Scene;
