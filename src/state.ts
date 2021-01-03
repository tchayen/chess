import { atom } from "jotai";
import { Position } from "./types";

export const hoveredAtom = atom<Position | null>(null);
