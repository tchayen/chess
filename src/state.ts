import { atom } from "jotai";
import initial from "./initial";
import { Color, Hovered, State } from "./types";

export const gameAtom = atom<State>(initial);
export const hoveredAtom = atom<Hovered | null>(null);
