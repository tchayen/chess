export type Color = "black" | "white";

export type Figure = "pawn" | "rook" | "bishop" | "knight" | "queen" | "king";

export type Position = [number, number];

export type Vector3 = [number, number, number];

export type State = {
  figures: {
    white: { figure: Figure; position: Position }[];
    black: { figure: Figure; position: Position }[];
  };
};
