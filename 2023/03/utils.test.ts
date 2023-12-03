import { assertEquals } from "https://deno.land/std@0.206.0/assert/mod.ts";

import {
  convertInputToString,
  isNumber,
  isDot,
  isSymbol,
  findNumber,
  getLineData,
  isAdjacentToSymbol,
  shouldReturnNumber,
} from "./utils.ts";

Deno.test("convertInputToString", () => {
  const input = `467..114..
...*......
..35..633.`;
  const expected = ["467..114..", "...*......", "..35..633."];
  const actual = convertInputToString(input);
  assertEquals(actual, expected);
});

Deno.test("isNumber", () => {
  const input = "1";
  const expected = true;
  const actual = isNumber(input);
  assertEquals(actual, expected);
});

Deno.test("isDot", () => {
  const input = ".";
  const expected = true;
  const actual = isDot(input);
  assertEquals(actual, expected);
});

Deno.test("isSymbol", () => {
  const input = "*";
  const expected = true;
  const actual = isSymbol(input);
  assertEquals(actual, expected);
});

Deno.test("findNumber", () => {
  const input = "..7458..989.";
  const index = 2;
  const expected = {
    number: "7458",
    indexRange: {
      start: 2,
      end: 5,
    },
  };
  const actual = findNumber(input, index);
  assertEquals(actual, expected);
});

Deno.test("getLineData", () => {
  const input = [
    "467.*.114.$.",
    "...*......",
  ];
  const columnIndex = 0;
  const actual = getLineData(input, columnIndex);
  const expected = {
    columnIndex: 0,
    numbers: [
      {
        number: "467",
        indexRange: {
          start: 0,
          end: 2,
        },
      },
      {
        number: "114",
        indexRange: {
          start: 6,
          end: 8,
        },
      },
    ],
    symbols: [
      {
        symbol: "*",
        index: 4,
      },
      {
        symbol: "$",
        index: 10,
      },
    ],
  };
  assertEquals(actual, expected);
});

Deno.test("isAdjacentToSymbol", () => {
  const number = {
    number: "467",
    indexRange: {
      start: 0,
      end: 2,
    },
  };
  const line = {
    columnIndex: 0,
    numbers: [
      {
        number: "467",
        indexRange: {
          start: 0,
          end: 2,
        },
      },
      {
        number: "114",
        indexRange: {
          start: 6,
          end: 8,
        },
      },
    ],
    symbols: [
      {
        symbol: "*",
        index: 3,
      },
      {
        symbol: "$",
        index: 10,
      },
    ],
  };
  const expected = true;
  const actual = isAdjacentToSymbol(number, line);
  assertEquals(actual, expected);
});

Deno.test("shouldReturnNumber", () => {
  const lines = [
    {
      columnIndex: 0,
      numbers: [
        {
          number: "467",
          indexRange: {
            start: 0,
            end: 2,
          },
        },
        {
          number: "114",
          indexRange: {
            start: 6,
            end: 8,
          },
        },
      ],
      symbols: [
        {
          symbol: "*",
          index: 3,
        },
        {
          symbol: "$",
          index: 10,
        },
      ],
    },
    {
      columnIndex: 1,
      numbers: [
        {
          number: "467",
          indexRange: {
            start: 0,
            end: 2,
          },
        },
        {
          number: "114",
          indexRange: {
            start: 6,
            end: 8,
          },
        },
      ],
      symbols: [
        {
          symbol: "*",
          index: 3,
        },
        {
          symbol: "$",
          index: 10,
        },
      ],
    },
  ];
  const selectedNumber = {
    number: "467",
    indexRange: {
      start: 0,
      end: 2,
    },
  };
  const columnIndex = 0;
  const expected = true;
  const actual = shouldReturnNumber(selectedNumber, lines, columnIndex);
  assertEquals(actual, expected);
});
