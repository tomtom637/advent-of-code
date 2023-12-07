import { assertEquals } from "https://deno.land/std@0.206.0/assert/mod.ts";

import {
  isAtRange,
  getRange,
  validateCategoryLine,
  validateFullCategory,
} from "./utils.ts";

import { partTwo } from "./solution.ts";
import { exampleInput, input } from "./inputs.ts";

Deno.test("isAtRange", () => {
  const startAt = 52;
  const range = 48;
  assertEquals(isAtRange(52, startAt, range), true);
  assertEquals(isAtRange(99, startAt, range), true);
  assertEquals(isAtRange(100, startAt, range), false);
});

Deno.test("getRange", () => {
  const value = 82;
  const startAt = 78;
  assertEquals(getRange(value, startAt), 4);
});

Deno.test("validateCategoryLine", () => {
  const seedValue = 79;
  const source = 50;
  const destination = 52;
  const range = 48;
  assertEquals(
    validateCategoryLine(seedValue, { source, destination, range }),
    81,
  );
});

Deno.test("validateFullCategory", () => {
  const seedValue1 = 14;
  const category1 = [
    [0, 15, 37],
    [37, 52, 2],
    [39, 0, 15],
  ];
  assertEquals(validateFullCategory(category1, seedValue1), 53);

  const seedValue2 = 53;
  const category2 = [
    [49, 53, 8],
    [0, 11, 42],
    [42, 0, 7],
    [57, 7, 4],
  ];
  assertEquals(validateFullCategory(category2, seedValue2), 49);
});

Deno.test("partTwo", () => {
  const expected = 46;
  const actual = partTwo(exampleInput);
  assertEquals(actual, expected);
});
