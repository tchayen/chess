import { Figure, Position, Color } from "./types";
import { useGLTF } from "@react-three/drei/useGLTF";
import { useState } from "react";
import { useAtom } from "jotai";
import { hoveredAtom } from "./state";
import { arrayEqual } from "./utils";

useGLTF.preload("/figures.gltf");

const Figure = ({
  figure,
  position,
  color,
}: {
  figure: Figure;
  position: Position;
  color: Color;
}) => {
  const { nodes } = useGLTF("/figures.gltf");
  const adjusted = [position[0] - 4, 0, position[1] - 4];
  const [hovered, setHovered] = useAtom(hoveredAtom);

  return (
    <group scale={[0.7, 0.7, 0.7]} position={adjusted} dispose={null}>
      <mesh
        onPointerOver={() => setHovered(position)}
        onPointerOut={() => setHovered(null)}
        geometry={nodes[figure].geometry}
      >
        <meshStandardMaterial
          color={
            hovered !== null && arrayEqual(hovered, position)
              ? "#ff00ff"
              : color
          }
        />
      </mesh>
    </group>
  );
};

export default Figure;
