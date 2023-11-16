import { assertEquals } from "https://deno.land/std@0.206.0/assert/mod.ts";
import { Instruction } from "./types.ts";

import {
  convertStringInputToInstructions,
  addDirectionFromInput,
  addDirectionAndAimFromInput,
  multiplyPosition,
} from "./utils.ts";

Deno.test("convert string input to array", () => {
  const input = `forward 5
down 5
up 3`;
  const expected = [
    ["forward", 5],
    ["down", 5],
    ["up", 3],
  ];
  const actual = convertStringInputToInstructions(input);
  assertEquals(actual, expected);
});

Deno.test("update position from an instruction", () => {
  const instructions = [
    ["forward", 5],
    ["down", 5],
    ["up", 3],
    ["down", 14]
  ];
  const expected = {
    x: 5,
    y: 16,
  };
  const actual = instructions.reduce((pos, instruction) =>
    addDirectionFromInput(instruction as Instruction, pos), { x: 0, y: 0 });
  assertEquals(actual, expected);
});

Deno.test("update position with angle from an instruction", () => {
  const instructions = [
    ["forward", 5],
    ["down", 5],
    ["forward", 8],
  ];
  const expected = {
    x: 13,
    y: 40,
    aim: 5,
  };
  const actual = instructions.reduce((pos, instruction) =>
    addDirectionAndAimFromInput(instruction as Instruction, pos), { x: 0, y: 0, aim: 0 });
  assertEquals(actual, expected);
});

Deno.test("multiply position", () => {
  const position = { x: 5, y: 16 };
  const expected = 80;
  const actual = multiplyPosition(position);
  assertEquals(actual, expected);
});
