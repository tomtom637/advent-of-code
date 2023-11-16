export type Direction = "forward" | "up" | "down";
export type Instruction = [Direction, number];
export type Position = { x: number; y: number };
export type PositionAndAim = { x: number; y: number; aim: number };