import { Figure, Position, State } from "./types";

const getAvailableMoves = (game: State, position: Position) => {
  const figure: Figure = game.mapping[position[0]][position[1]];
  if (!figure) {
    return null;
  }

  const {
    position: [x, y],
  } = figure;

  const moves: Position[] = [];
  const takes: Position[] = [];

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
        takes.push([x, y]);
      }

      return true;
    }

    moves.push([x, y]);
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
            takes.push([x - 1, y - 1]);
          }
        }

        if (x + 1 <= 7 && y - 1 >= 0) {
          const checkRight: Figure = game.mapping[x + 1][y - 1];
          if (checkRight && checkRight.color === "black") {
            takes.push([x + 1, y - 1]);
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
            takes.push([x - 1, y + 1]);
          }
        }

        if (x + 1 <= 7 && y - 1 >= 0) {
          const checkRight: Figure = game.mapping[x + 1][y + 1];
          if (checkRight && checkRight.color === "white") {
            takes.push([x + 1, y + 1]);
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

  return { moves, takes };
};

export default getAvailableMoves;
