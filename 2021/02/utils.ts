import { Direction, Instruction, Position, PositionAndAim } from "./types.ts";

/** Converts the string input to a matrix of a direction with a number value */
export function convertStringInputToInstructions(input: string) {
  return input.split("\n")
    .map(row => row.split(" ")
    .map((value, i) => {
      if (i === 0) return value as Direction;
      return parseInt(value);
    }));
}

/** Updates a position from an instruction */
export function addDirectionFromInput(input: Instruction, { x, y }: Position) {
  const [direction, value] = input;
  switch (direction) {
    case "forward":
      return { x: x + value, y };
    case "up":
      return { x, y: y - value };
    case "down":
      return { x, y: y + value };
  }
}

/** Updates a position with angle from an instruction */
export function addDirectionAndAimFromInput(input: Instruction, { x, y, aim }: PositionAndAim) {
  const [direction, value] = input;
  switch (direction) {
    case "forward":
      return {
        x: x + value,
        y: y + (aim * value),
        aim
      };
    case "up":
      return {
        x,
        y,
        aim: aim - value
      };
    case "down":
      return {
        x,
        y,
        aim: aim + value
      };
  }
}

/** Returns the x and y values multiplied with each other */
export function multiplyPosition({ x, y }: Position) {
  return x * y;
}