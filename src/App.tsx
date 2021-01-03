import { Canvas } from "react-three-fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Provider, useAtom } from "jotai";
import { Color, State } from "./types";
import Chessboard from "./Chessboard";
import Figure from "./Figure";
import { gameAtom, hoveredAtom } from "./state";
import Square from "./Square";

const Figures = () => {
  const [game] = useAtom(gameAtom);

  return (
    <>
      {game.figures.map((figure) => {
        return (
          <Figure
            key={`(${figure.position[0]},${figure.position[1]})`}
            position={figure.position}
            figure={figure.figure}
            color={figure.color}
          />
        );
      })}
    </>
  );
};

const AvailableMoves = () => {
  const [hovered] = useAtom(hoveredAtom);
  const [game, setGame] = useAtom(gameAtom);

  if (hoveredAtom == null) {
    return null;
  }

  const available = [[3, 2]];

  return (
    <>
      {available.map((move) => (
        <Square
          key={`(${move[0]},${move[1]})`}
          x={move[0]}
          y={move[1]}
          z={0.01}
          color="#ff00ff"
          size={0.5}
        />
      ))}
    </>
  );
};

const App = () => {
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
