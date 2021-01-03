import { Figure, Vector3 } from "./types";
import { useGLTF } from "@react-three/drei/useGLTF";
import { useState } from "react";

useGLTF.preload("/figures.gltf");

const Figure = ({
  figure,
  position,
}: {
  figure: Figure;
  position: Vector3;
}) => {
  const { nodes } = useGLTF("/figures.gltf");
  const [color, setColor] = useState("#fff");
  return (
    <group scale={[0.7, 0.7, 0.7]} position={position} dispose={null}>
      <mesh
        onPointerOver={() => setColor("#ff00ff")}
        onPointerOut={() => setColor("#fff")}
        geometry={nodes[figure].geometry}
      >
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

export default Figure;
