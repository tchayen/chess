import { Canvas } from "react-three-fiber";
import { Suspense, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei/useGLTF";
import { atom } from "jotai";
import { State, Vector3 } from "./types";
import Chessboard from "./Chessboard";
import Figure from "./Figure";

const initial: State = {
  figures: {
    black: [
      {
        figure: "pawn",
        position: [0, 1],
      },
      {
        figure: "pawn",
        position: [1, 1],
      },
      {
        figure: "pawn",
        position: [2, 1],
      },
      {
        figure: "pawn",
        position: [3, 1],
      },
      {
        figure: "pawn",
        position: [4, 1],
      },
      {
        figure: "pawn",
        position: [5, 1],
      },
      {
        figure: "pawn",
        position: [6, 1],
      },
      {
        figure: "pawn",
        position: [7, 1],
      },
      {
        figure: "rook",
        position: [0, 0],
      },
      {
        figure: "knight",
        position: [1, 0],
      },
      {
        figure: "bishop",
        position: [2, 0],
      },
      {
        figure: "queen",
        position: [3, 0],
      },
      {
        figure: "king",
        position: [4, 0],
      },
      {
        figure: "bishop",
        position: [5, 0],
      },
      {
        figure: "knight",
        position: [6, 0],
      },
      {
        figure: "rook",
        position: [7, 0],
      },
    ],
    white: [
      {
        figure: "pawn",
        position: [0, 6],
      },
      {
        figure: "pawn",
        position: [1, 6],
      },
      {
        figure: "pawn",
        position: [2, 6],
      },
      {
        figure: "pawn",
        position: [3, 6],
      },
      {
        figure: "pawn",
        position: [4, 6],
      },
      {
        figure: "pawn",
        position: [5, 6],
      },
      {
        figure: "pawn",
        position: [6, 6],
      },
      {
        figure: "pawn",
        position: [7, 6],
      },
      {
        figure: "rook",
        position: [0, 7],
      },
      {
        figure: "knight",
        position: [1, 7],
      },
      {
        figure: "bishop",
        position: [2, 7],
      },
      {
        figure: "queen",
        position: [3, 7],
      },
      {
        figure: "king",
        position: [4, 7],
      },
      {
        figure: "bishop",
        position: [5, 7],
      },
      {
        figure: "knight",
        position: [6, 7],
      },
      {
        figure: "rook",
        position: [7, 7],
      },
    ],
  },
};

const App = () => {
  return (
    <Canvas concurrent pixelRatio={[1, 2]} camera={{ position: [0, 10, 10] }}>
      <ambientLight intensity={0.7} />
      <spotLight
        intensity={1}
        angle={0.1}
        penumbra={1}
        position={[5, 25, 20]}
      />
      <Suspense fallback={null}>
        <Chessboard />
        {initial.figures.black.map((figure) => {
          const position: Vector3 = [figure.position[0], 0, figure.position[1]];
          return (
            <Figure
              key={`(${figure.position[0]},${figure.position[1]})`}
              position={position}
              figure={figure.figure}
            />
          );
        })}
      </Suspense>
      {/* <OrbitControls
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        enableZoom={false}
        enablePan={false}
      /> */}
    </Canvas>
  );
};

export default App;
