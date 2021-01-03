import { atom } from "jotai";
import initial from "./initial";
import { Position, State } from "./types";

export const gameAtom = atom<State>(initial);
export const hoveredAtom = atom<Position | null>(null);
