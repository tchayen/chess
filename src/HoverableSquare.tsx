import { useAtom } from "jotai";
import { useState } from "react";
import { gameAtom, hoveredAtom } from "./state";
import { Figure } from "./types";

const HoverableSquare = ({
  x,
  y,
  z,
  size,
  color,
}: {
  x: number;
  y: number;
  z?: number;
  size: number;
  color: (hovered: boolean) => string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [game, setGame] = useAtom(gameAtom);
  const [hovered, setHovered] = useAtom(hoveredAtom);
  return (
    <group
      position={[x - 4, z || 0, y - 4]}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onPointerUp={() => {
        if (!hovered) {
          return;
        }

        console.log("selected movement!");
        const beating: Figure = game.mapping[x][y];

        if (game.mapping[x][y] === hovered.position) {
          console.log("hmmm no");
          return;
        }

        if (beating) {
          game.figures = game.figures.filter(
            (figure) => !(figure.position[0] === x && figure.position[1] === y)
          );
          console.log("a");
          const current: Figure =
            game.mapping[hovered.position[0]][hovered.position[1]];
          game.mapping[x][y] = current;
          current.position = [x, y];
          game.mapping[hovered.position[0]][hovered.position[1]] = undefined;
        } else {
          console.log("b");
          const current: Figure =
            game.mapping[hovered.position[0]][hovered.position[1]];
          game.mapping[x][y] = current;
          current.position = [x, y];
          game.mapping[hovered.position[0]][hovered.position[1]] = undefined;
        }
        setHovered(null);
        setGame({ ...game });
      }}
    >
      <mesh>
        <boxBufferGeometry attach="geometry" args={[1, 0, 1]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
      <mesh>
        <boxBufferGeometry attach="geometry" args={[size, 0, size]} />
        <meshStandardMaterial attach="material" color={color(isHovered)} />
      </mesh>
    </group>
  );
};

export default HoverableSquare;
