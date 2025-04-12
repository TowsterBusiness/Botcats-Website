import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Mesh } from "three";

export const Box: React.FC<{ scrollPosition: number }> = ({
  scrollPosition,
}) => {
  const ref = React.useRef<Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      // Update rotation based on scroll position
      ref.current.rotation.y = scrollPosition * 0.01; // Adjust speed multiplier
      ref.current.rotation.x = scrollPosition * 0.005;
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};
