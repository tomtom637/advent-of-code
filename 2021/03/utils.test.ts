import { assertEquals } from "https://deno.land/std@0.206.0/assert/mod.ts";

import { convertStringInputToArray } from "./utils.ts";

Deno.test("convert string input to array", () => {
  const input = `0010
1101
0101`;
  const expected = ["0010", "1101", "0101"];
  const actual = convertStringInputToArray(input);
  assertEquals(actual, expected);
});
