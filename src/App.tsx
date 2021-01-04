import { Canvas } from "react-three-fiber";
import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Provider, useAtom } from "jotai";
import { Figure, Position } from "./types";
import Chessboard from "./Chessboard";
import Piece from "./Piece";
import { gameAtom, hoveredAtom } from "./state";
import Square from "./Square";
import HoverableSquare from "./HoverableSquare";

const Figures = () => {
  console.log("Figures");
  const [game] = useAtom(gameAtom);

  return (
    <>
      {game.figures.map((figure) => {
        return (
          <Piece
            key={`(${figure.position[0]},${figure.position[1]})`}
            position={figure.position}
            piece={figure.piece}
            color={figure.color}
          />
        );
      })}
    </>
  );
};

const AvailableMoves = () => {
  console.log("AvailableMoves");
  const [hovered] = useAtom(hoveredAtom);

  if (!hovered) {
    return null;
  }

  console.log(hovered);

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
        />
      ))}
    </>
  );
};

const App = () => {
  console.log("App");
  return (
    <Canvas concurrent pixelRatio={[1, 2]} camera={{ position: [4, 10, 0] }}>
      <Provider>
        <ambientLight intensity={1} />
        {/* <spotLight
        intensity={1}
        angle={0.1}
        penumbra={1}
        position={[5, 25, 20]}
      /> */}
        <Suspense fallback={null}>
          <Chessboard />
          <Figures />
          <AvailableMoves />
        </Suspense>
        {/* <OrbitControls
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        enableZoom={false}
        enablePan={false}
      /> */}
      </Provider>
    </Canvas>
  );
};

export default App;
