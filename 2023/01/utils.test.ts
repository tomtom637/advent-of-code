import { assertEquals } from "https://deno.land/std@0.206.0/assert/mod.ts";

import {
  convertStringInputToArray,
  filterStringToNumberArray,
  replaceCharNumbers,
  resolveNumberPair,
} from "./utils.ts";

Deno.test("convert string input to array", () => {
  const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;
  const expected = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
  const actual = convertStringInputToArray(input);
  assertEquals(actual, expected);
});

Deno.test("filter string array to number array", () => {
  const input = "1abc28";
  const expected = [1, 2, 8];
  const actual = filterStringToNumberArray(input);
  assertEquals(actual, expected);
});

Deno.test("replace char numbers", () => {
  const input = "one25tsleightwo9p";
  const expected = "one1one25tsleight8eightwo2two9p";
  const actual = replaceCharNumbers(input);
  assertEquals(actual, expected);
});

Deno.test("resolve number pair", () => {
  const input1 = [1, 2, 3, 4, 5];
  const expected1 = 15;
  const actual1 = resolveNumberPair(input1);
  assertEquals(actual1, expected1);
  const input2 = [1];
  const expected2 = 11;
  const actual2 = resolveNumberPair(input2);
  assertEquals(actual2, expected2);
});
