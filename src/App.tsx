import { Canvas } from "react-three-fiber";
import React, { Suspense, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Hovered, State } from "./types";
import Chessboard from "./Chessboard";
import Piece from "./Piece";
import HoverableSquare from "./HoverableSquare";
import initial from "./initial";

const Figures = ({
  game,
  hovered,
  setHovered,
}: {
  game: State;
  hovered: Hovered | null;
  setHovered: (hovered: Hovered | null) => void;
}) => {
  console.log("Figures");

  return (
    <>
      {game.figures.map((figure) => {
        return (
          <Piece
            key={`(${figure.position[0]},${figure.position[1]})`}
            position={figure.position}
            piece={figure.piece}
            color={figure.color}
            game={game}
            hovered={hovered}
            setHovered={setHovered}
          />
        );
      })}
    </>
  );
};

const AvailableMoves = ({
  game,
  hovered,
  setGame,
  setHovered,
}: {
  game: State;
  hovered: Hovered | null;
  setGame: (hovered: State) => void;
  setHovered: (hovered: Hovered | null) => void;
}) => {
  console.log("AvailableMoves");

  if (!hovered) {
    return null;
  }

  return (
    <>
      {hovered.available.moves.map((move) => (
        <HoverableSquare
          key={`(${move[0]},${move[1]})`}
          x={move[0]}
          y={move[1]}
          z={0.01}
          color={(hovered) => (hovered ? "#0000ff" : "#ff00ff")}
          size={0.5}
          game={game}
          hovered={hovered}
          setGame={setGame}
          setHovered={setHovered}
        />
      ))}
      {hovered.available.takes.map((move) => (
        <HoverableSquare
          key={`(${move[0]},${move[1]})`}
          x={move[0]}
          y={move[1]}
          z={0.01}
          color={(hovered) => (hovered ? "#0000ff" : "#ff00ff")}
          size={0.9}
          game={game}
          hovered={hovered}
          setGame={setGame}
          setHovered={setHovered}
        />
      ))}
    </>
  );
};

const App = () => {
  const [game, setGame] = useState<State>(initial);
  const [hovered, setHovered] = useState<Hovered | null>(null);

  return (
    <>
      {game.currentTurn}
      <Canvas concurrent pixelRatio={[1, 2]} camera={{ position: [4, 10, 0] }}>
        <ambientLight intensity={1} />
        {/* <spotLight
        intensity={1}
        angle={0.1}
        penumbra={1}
        position={[5, 25, 20]}
      /> */}
        <Suspense fallback={null}>
          <Chessboard />
          <Figures game={game} hovered={hovered} setHovered={setHovered} />
          <AvailableMoves
            game={game}
            hovered={hovered}
            setGame={setGame}
            setHovered={setHovered}
          />
        </Suspense>
        {/* <OrbitControls
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        enableZoom={false}
        enablePan={false}
      /> */}
      </Canvas>
    </>
  );
};

export default App;
