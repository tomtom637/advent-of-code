import { exampleInput, input } from "./inputs.ts";
import { addDirectionFromInput, multiplyPosition, addDirectionAndAimFromInput } from "./utils.ts";
import { Instruction, Position, PositionAndAim } from "./types.ts";

function resolveFinalPosition(input: Instruction[]) {
  const initialPosition: Position = { x: 0, y: 0 };
  return multiplyPosition(
    input.reduce((position: Position, instruction: Instruction) => {
    return addDirectionFromInput(instruction, position);
    }, initialPosition)
  );
}

console.log(resolveFinalPosition(exampleInput as Instruction[]));
console.log(resolveFinalPosition(input as Instruction[]));

function resolveFinalPositionWithAim(input: Instruction[]) {
  const initialPosition: PositionAndAim = { x: 0, y: 0, aim: 0 };
  return multiplyPosition(
    input.reduce((position: PositionAndAim, instruction: Instruction) => {
    return addDirectionAndAimFromInput(instruction, position);
    }, initialPosition)
  );
}

console.log(resolveFinalPositionWithAim(exampleInput as Instruction[]));
console.log(resolveFinalPositionWithAim(input as Instruction[]));
