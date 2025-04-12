import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import style from "./App.module.css";
import { Mesh } from "three";

import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { DragControls, OrbitControls, useGLTF } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export interface RobotModelProps {
  scrollPosition: number;
  mousePos: Array<number>;
}

let currRot = [0.4, 2.5, 0];

const RobotModel = (props: RobotModelProps) => {
  const { scene } = useGLTF("/Clawthing.glb");

  const ref = React.useRef<Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      // // Update rotation based on scroll position
      ref.current.rotation.x = currRot[0];
      ref.current.rotation.y = currRot[1];
      // Adjust speed multiplier

      let x = 0.4 - props.mousePos[1] * 0.3;
      let y = 2.5 + props.mousePos[0] * 0.3;

      currRot[0] -= (currRot[0] - x) * 0.1;
      currRot[1] -= (currRot[1] - y) * 0.1;
    }
  });

  return (
    <mesh ref={ref}>
      <primitive object={scene} scale={0.5} position={[0, -0.5, 0]} />
    </mesh>
  );
};

// useGLTF.preload("/botfull.glb");

export default RobotModel;
