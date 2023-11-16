import { assertEquals } from "https://deno.land/std@0.206.0/assert/mod.ts";

import {
  convertStringInputToMatrix,
  convertMatrixToString,
  makeMatrixCopy,
  isEmpty,
  isEast,
  isSouth,
  getRow,
  getColumn,
  shouldMoveEast,
  shouldMoveSouth,
  moveEast,
  moveSouth
} from "./utils.ts";

Deno.test("convertStringInputToMatrix", () => {
  const input = `>..v
..<.
..<v`;
  const expected = [
    [">", ".", ".", "v"],
    [".", ".", "<", "."],
    [".", ".", "<", "v"],
  ];
  const actual = convertStringInputToMatrix(input);
  assertEquals(actual, expected);
});

Deno.test("convertMatrixToString", () => {
  const matrix = [
    [">", ".", ".", "v"],
    [".", ".", "<", "."],
    [".", ".", "<", "v"],
  ];
  const expected = `> . . v
. . < .
. . < v`;
  const actual = convertMatrixToString(matrix);
  assertEquals(actual, expected);
});

Deno.test("makeMatrixCopy", () => {
  const matrix = [
    [">", ".", ".", "v"],
    [".", ".", "<", "."],
    [".", ".", "<", "v"],
  ];
  const expected = [
    [">", ".", ".", "v"],
    [".", ".", "<", "."],
    [".", ".", "<", "v"],
  ];
  const actual = makeMatrixCopy(matrix);
  assertEquals(actual, expected);
});

Deno.test("isEmpty", () => {
  assertEquals(isEmpty("."), true);
  assertEquals(isEmpty(">"), false);
  assertEquals(isEmpty("v"), false);
  assertEquals(isEmpty("<"), false);
});

Deno.test("isEast", () => {
  assertEquals(isEast("."), false);
  assertEquals(isEast(">"), true);
  assertEquals(isEast("v"), false);
  assertEquals(isEast("<"), false);
});

Deno.test("isSouth", () => {
  assertEquals(isSouth("."), false);
  assertEquals(isSouth(">"), false);
  assertEquals(isSouth("v"), true);
  assertEquals(isSouth("<"), false);
});

Deno.test("getRow", () => {
  const matrix = [
    [">", ".", ".", "v"],
    [".", ".", "<", "."],
    [".", ".", "<", "v"],
  ];
  assertEquals(getRow(matrix, 0), [">", ".", ".", "v"]);
  assertEquals(getRow(matrix, 1), [".", ".", "<", "."]);
  assertEquals(getRow(matrix, 2), [".", ".", "<", "v"]);
});

Deno.test("getColumn", () => {
  const matrix = [
    [">", ".", ".", "v"],
    [".", ".", "<", "."],
    [".", ".", "<", "v"],
  ];
  assertEquals(getColumn(matrix, 0), [">", ".", "."]);
  assertEquals(getColumn(matrix, 1), [".", ".", "."]);
  assertEquals(getColumn(matrix, 2), [".", "<", "<"]);
  assertEquals(getColumn(matrix, 3), ["v", ".", "v"]);
});

Deno.test("shouldMoveEast", () => {
  const row = [">", ".", ".", "v"];
  assertEquals(shouldMoveEast(row, 0), true);
  assertEquals(shouldMoveEast(row, 1), false);
  assertEquals(shouldMoveEast(row, 2), false);
  assertEquals(shouldMoveEast(row, 3), false);
});

Deno.test("shouldMoveSouth", () => {
  const column = [".", ">", "v", "v"];
  const column2 = [".", ">", "v", "."];
  assertEquals(shouldMoveSouth(column, 2), false);
  assertEquals(shouldMoveSouth(column, 3), true);
  assertEquals(shouldMoveSouth(column2, 2), true);
});

Deno.test("moveEast", () => {
  const row = [">", ".", ".", "v"];
  const row2 = [".", ".", ".", ">"];
  assertEquals(moveEast(row, 0), [".", ">", ".", "v"]);
  assertEquals(moveEast(row2, 3), [">", ".", ".", "."]);
});

Deno.test("moveSouth", () => {
  const column = [".", ">", "v", "v"];
  const column2 = [">", ".", "v", "."];
  assertEquals(moveSouth(column, 3), ["v", ">", "v", "."]);
  assertEquals(moveSouth(column2, 2), [">", ".", ".", "v"]);
});