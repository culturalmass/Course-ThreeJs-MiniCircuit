import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useControls from "./useControls";
import useWheels from "./useWheels";
import WheelDebug from "./WheelDebug";

const Car = ({ thirdPerson }) => {
  // let mesh = useLoader(GLTFLoader, "/models/car.glb").scene;
  let mesh = useLoader(GLTFLoader, "/models/car2.glb").scene;

  const position = [-1.5, 0.5, 3];
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(
    () => ({
      args: chassisBodyArgs,
      mass: 150,
      position,
    }),
    useRef(null)
  );
  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);
  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null)
  );

  useControls(vehicleApi, chassisApi);
  useFrame((state) => {
    if (!thirdPerson) return;
    let position = new Vector3(0, 0, 0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);

    let quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    let wDir = new Vector3(0, 0, -1);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();

    let cameraPosition = position
      .clone()
      .add(wDir.clone().multiplyScalar(-1).add(new Vector3(0, 0.15, 0)));
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  });

  useEffect(() => {
    // mesh.scale.set(0.0012, 0.0012, 0.0012);
    // mesh.children[0].position.set(-365, -18, -67);

    //My settings
    mesh.scale.set(0.08, 0.08, 0.08);
    mesh.children[0].position.set(10, -0.025, 0);
  }, [mesh]);
  return (
    <group ref={vehicle} name="vehicle">
      <group ref={chassisBody} name="chassisBody">
        <primitive
          object={mesh}
          rotation-y={Math.PI}
          position={[0.8, -0.1, 0]}
        />
      </group>
      {/* <mesh ref={chassisBody}>
        <meshBasicMaterial transparent={true} opacity={0.3} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh> */}
      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
};
export default Car;
