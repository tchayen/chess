import { Canvas } from "react-three-fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { atom, Provider } from "jotai";
import { Color, State, Vector3 } from "./types";
import Chessboard from "./Chessboard";
import Figure from "./Figure";
import initial from "./initial";

const Figures = ({ color }: { color: Color }) => {
  return (
    <>
      {initial.figures[color].map((figure) => {
        return (
          <Figure
            key={`(${figure.position[0]},${figure.position[1]})`}
            position={figure.position}
            figure={figure.figure}
            color={color}
          />
        );
      })}
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
          <Figures color="black" />
          <Figures color="white" />
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
