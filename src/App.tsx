import { Canvas } from "react-three-fiber";
import { Suspense, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { Provider, useAtom } from "jotai";
import { Color, Figure, Position, State } from "./types";
import Chessboard from "./Chessboard";
import Piece from "./Piece";
import { gameAtom, hoveredAtom } from "./state";
import Square from "./Square";
import { arrayEqual } from "./utils";

const Figures = () => {
  const [game] = useAtom(gameAtom);

  return (
    <>
      {game.figures.map((figure) => {
        return (
          <Piece
            key={`(${figure.position[0]},${figure.position[1]})`}
            position={figure.position}
            figure={figure.piece}
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

  if (hovered == null) {
    return null;
  }

  const figure: Figure = game.mapping[hovered[0]][hovered[1]];
  if (!figure) {
    return null;
  }

  const {
    position: [x, y],
  } = figure;

  const available: Position[] = [];
  const beatable: Position[] = [];

  const checkDirection = (signA: number, signB: number, range: number) => {
    const { position } = figure;
    for (let i = 0; i < range + 1; i++) {
      const x = position[0] + signA * i;
      const y = position[1] + signB * i;

      const next = checkField(x, y);
      if (next === true) {
        break;
      } else if (next === false) {
        continue;
      }
    }
  };

  /**
   * Returns true if movement is blocking, false otherwise.
   */
  const checkField = (x: number, y: number) => {
    if (x == figure.position[0] && y === figure.position[1]) {
      return false;
    }

    if (x < 0 || y < 0 || x > 7 || y > 7) {
      return true;
    }

    const field = game.mapping[x][y];

    if (field) {
      if (field.color === figure.color) {
        return true;
      }
      if (figure.piece !== "pawn") {
        beatable.push([x, y]);
      }

      return true;
    }

    available.push([x, y]);
  };

  switch (figure.piece) {
    case "bishop":
      checkDirection(-1, -1, 8);
      checkDirection(-1, 1, 8);
      checkDirection(1, -1, 8);
      checkDirection(1, 1, 8);
      break;
    case "king":
      checkDirection(-1, -1, 1);
      checkDirection(-1, 1, 1);
      checkDirection(1, -1, 1);
      checkDirection(1, 1, 1);
      checkDirection(0, -1, 1);
      checkDirection(0, 1, 1);
      checkDirection(1, 0, 1);
      checkDirection(-1, 0, 1);
      break;
    case "knight":
      const knightMoves: Position[] = [
        [x - 2, y - 1],
        [x - 1, y - 2],
        [x + 1, y - 2],
        [x + 2, y - 1],
        [x + 2, y + 1],
        [x + 1, y + 2],
        [x - 1, y + 2],
        [x - 2, y + 1],
      ];

      knightMoves.forEach((move) => {
        checkField(move[0], move[1]);
      });
      break;
    case "pawn":
      if (figure.color === "white") {
        if (y === 6) {
          checkDirection(0, -1, 2);
        } else {
          checkDirection(0, -1, 1);
        }

        if (x - 1 >= 0 && y - 1 >= 0) {
          const checkLeft: Figure = game.mapping[x - 1][y - 1];
          if (checkLeft && checkLeft.color === "black") {
            beatable.push([x - 1, y - 1]);
          }
        }

        if (x + 1 <= 7 && y - 1 >= 0) {
          const checkRight: Figure = game.mapping[x + 1][y - 1];
          if (checkRight && checkRight.color === "black") {
            beatable.push([x + 1, y - 1]);
          }
        }
      } else {
        if (y === 1) {
          checkDirection(0, 1, 2);
        } else {
          checkDirection(0, 1, 1);
        }

        if (x - 1 >= 0 && y - 1 >= 0) {
          const checkLeft: Figure = game.mapping[x - 1][y + 1];
          if (checkLeft && checkLeft.color === "white") {
            beatable.push([x - 1, y + 1]);
          }
        }

        if (x + 1 <= 7 && y - 1 >= 0) {
          const checkRight: Figure = game.mapping[x + 1][y + 1];
          if (checkRight && checkRight.color === "white") {
            beatable.push([x + 1, y + 1]);
          }
        }
      }
      break;
    case "queen":
      checkDirection(-1, -1, 8);
      checkDirection(-1, 1, 8);
      checkDirection(1, -1, 8);
      checkDirection(1, 1, 8);
      checkDirection(0, -1, 8);
      checkDirection(0, 1, 8);
      checkDirection(1, 0, 8);
      checkDirection(-1, 0, 8);
      break;
    case "rook":
      checkDirection(0, -1, 8);
      checkDirection(0, 1, 8);
      checkDirection(1, 0, 8);
      checkDirection(-1, 0, 8);
      break;
  }

  return (
    <>
      {available.map((move) => (
        <Square
          key={`(${move[0]},${move[1]})`}
          x={move[0]}
          y={move[1]}
          z={0.01}
          color="#ff00ff"
          size={0.8}
        />
      ))}
      {beatable.map((move) => (
        <Square
          key={`(${move[0]},${move[1]})`}
          x={move[0]}
          y={move[1]}
          z={0.01}
          color="#ff00ff"
          size={1}
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
