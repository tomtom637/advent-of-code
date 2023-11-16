import { assertEquals } from "https://deno.land/std@0.206.0/assert/mod.ts";

import {
  convertStringInputToArray,
  countDepthIncrease,
  createMeasurementWindows,
  sum,
} from "./utils.ts";

Deno.test("convert string input to array", () => {
  const input = `1721
979
366`;
  const expected = [1721, 979, 366];
  const actual = convertStringInputToArray(input);
  assertEquals(actual, expected);
});

Deno.test("count depth increase", () => {
  const input = [1721, 979, 366, 422, 111, 112];
  const expected = 2;
  const actual = countDepthIncrease(input);
  assertEquals(actual, expected);
});

Deno.test("create measurement windows of size 3", () => {
  const input = [1721, 979, 366, 422, 111, 112];
  const expected = [
    [1721, 979, 366],
    [979, 366, 422],
    [366, 422, 111],
    [422, 111, 112],
  ];
  const actual = createMeasurementWindows(input, 3);
  assertEquals(actual, expected);
});

Deno.test("create measurement windows of size 5", () => {
  const input = [1721, 979, 366, 422, 111, 112, 123, 456, 789, 1011];
  const expected = [
    [1721, 979, 366, 422, 111],
    [979, 366, 422, 111, 112],
    [366, 422, 111, 112, 123],
    [422, 111, 112, 123, 456],
    [111, 112, 123, 456, 789],
    [112, 123, 456, 789, 1011],
  ];
  const actual = createMeasurementWindows(input, 5);
  assertEquals(actual, expected);
});

Deno.test("create measurement windows with smaller input than the size", () => {
  const input = [1721, 979, 366, 422];
  const expected = [
    [1721, 979, 366, 422],
  ];
  const actual = createMeasurementWindows(input, 5);
  assertEquals(actual, expected);
});

Deno.test("create measurement windows with input of the same size", () => {
  const input = [1721, 979, 366, 422, 637];
  const expected = [
    [1721, 979, 366, 422, 637],
  ];
  const actual = createMeasurementWindows(input, 5);
  assertEquals(actual, expected);
});

Deno.test("sum", () => {
  const input = [1, 2, 3];
  const expected = 6;
  const actual = sum(input);
  assertEquals(actual, expected);
});