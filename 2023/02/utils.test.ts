import { assertEquals } from "https://deno.land/std@0.206.0/assert/mod.ts";

import {
  convertStringInputToArray,
  getColorsFromHandful,
  getLineInfos,
  shouldFilterLine,
  calculatePowerOfSet,
} from "./utils.ts";

Deno.test("convert string input to array", () => {
  const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue`;
  const expected = [
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"
  ];
  const actual = convertStringInputToArray(input);
  assertEquals(actual, expected);
});

Deno.test("get colors from handful", () => {
  const input = "3 blue, 4 red";
  const expected = { red: 4, green: 0, blue: 3 };
  const actual = getColorsFromHandful(input);
  assertEquals(actual, expected);
});

Deno.test("get line infos", () => {
  const input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
  const expected = { id: 1, red: 4, green: 2, blue: 6 };
  const actual = getLineInfos(input);
  assertEquals(actual, expected);
});

Deno.test("should filter line", () => {
  const line = { id: 2, red: 15, green: 4, blue: 9 };
  const filterRules = { red: 12, green: 13, blue: 14 };
  const expected = true;
  const actual = shouldFilterLine(line, filterRules);
  assertEquals(actual, expected);
});

Deno.test("calculate power of set", () => {
  const line = { id: 2, red: 15, green: 4, blue: 9 };
  const expected = 15 * 4 * 9;
  const actual = calculatePowerOfSet(line);
  assertEquals(actual, expected);
});
