import { assertEquals } from "https://deno.land/std@0.206.0/assert/mod.ts";

import {
  convertStringInputToMatrix,
  getColumn,
  calculateBitFromColumn,
  resolveGammaAndEpsilon,
} from "./utils.ts";

Deno.test("convert string input to matrix of bits", () => {
  const input = `0010
1101
0101`;
  const expected = [
    [0, 0, 1, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 1],
  ];
  const actual = convertStringInputToMatrix(input);
  assertEquals(actual, expected);
});

Deno.test("getColumn", () => {
  const matrix = [
    [0, 0, 1, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 1],
  ];
  assertEquals(getColumn(matrix, 0), [0, 1, 0]);
  assertEquals(getColumn(matrix, 1), [0, 1, 1]);
  assertEquals(getColumn(matrix, 2), [1, 0, 0]);
  assertEquals(getColumn(matrix, 3), [0, 1, 1]);
});

Deno.test("calculateBitFromColumn", () => {
  assertEquals(calculateBitFromColumn([0, 1, 0]), "0");
  assertEquals(calculateBitFromColumn([0, 1, 1]), "1");
  assertEquals(calculateBitFromColumn([1, 0, 0]), "0");
  assertEquals(calculateBitFromColumn([0, 1, 1]), "1");
});

Deno.test("resolveGammaAndEpsilon", () => {
  const bitString = "10110";
  const expected = [22, 9];
  const actual = resolveGammaAndEpsilon(bitString);
  assertEquals(actual, expected);
});
