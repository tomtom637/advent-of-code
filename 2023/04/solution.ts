import { exampleInput, input } from "./inputs.ts";
import { getScratchcardsAmount, getPoints } from "./utils.ts";

export function partOne(input: string[]) {
  return input.reduce((acc, card) => acc + getPoints(card), 0);
}

console.log("Part One:", partOne(exampleInput));
console.log("Part One:", partOne(input));

export function partTwo(input: string[]) {
  return getScratchcardsAmount(input);
}

console.log("Part Two:", partTwo(exampleInput));
console.log("Part Two:", partTwo(input));
