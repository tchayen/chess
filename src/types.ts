export type Color = "black" | "white";

export type Piece = "pawn" | "rook" | "bishop" | "knight" | "queen" | "king";

export type Position = [number, number];

export type Vector3 = [number, number, number];

export type Figure = {
  piece: Piece;
  color: Color;
  position: Position;
};

export type Hovered = {
  position: Position;
  selected: boolean;
  available: {
    moves: Position[];
    takes: Position[];
  };
};

export type State = {
  currentTurn: Color;
  figures: Figure[];
  mapping: any[][];
};
