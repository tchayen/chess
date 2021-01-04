import { useState } from "react";
import { Figure, Hovered, State } from "./types";

const HoverableSquare = ({
  x,
  y,
  z,
  size,
  color,
  game,
  hovered,
  setGame,
  setHovered,
}: {
  x: number;
  y: number;
  z?: number;
  size: number;
  color: (hovered: boolean) => string;
  game: State;
  hovered: Hovered | null;
  setGame: (hovered: State) => void;
  setHovered: (hovered: Hovered | null) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <group
      position={[x - 4, z || 0, y - 4]}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onPointerUp={() => {
        if (!hovered) {
          return;
        }

        const beating: Figure = game.mapping[x][y];

        if (game.mapping[x][y] === hovered.position) {
          return;
        }

        if (beating) {
          game.figures = game.figures.filter(
            (figure) => !(figure.position[0] === x && figure.position[1] === y)
          );
          const current: Figure =
            game.mapping[hovered.position[0]][hovered.position[1]];
          game.mapping[x][y] = current;
          current.position = [x, y];
          game.mapping[hovered.position[0]][hovered.position[1]] = undefined;
        } else {
          const current: Figure =
            game.mapping[hovered.position[0]][hovered.position[1]];
          game.mapping[x][y] = current;
          current.position = [x, y];
          game.mapping[hovered.position[0]][hovered.position[1]] = undefined;
        }
        setHovered(null);
        setGame({
          ...game,
          currentTurn: game.currentTurn === "white" ? "black" : "white",
        });
      }}
    >
      {/* <mesh>
        <boxBufferGeometry attach="geometry" args={[1, 0, 1]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh> */}
      <mesh>
        <boxBufferGeometry attach="geometry" args={[size, 0, size]} />
        <meshStandardMaterial attach="material" color={color(isHovered)} />
      </mesh>
    </group>
  );
};

export default HoverableSquare;
