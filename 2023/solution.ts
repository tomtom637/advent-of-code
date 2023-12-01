import { exampleInput, input } from "./inputs.ts";
import { resolveNumberPair } from "./utils.ts";

function resolveSumOfLines(input: number[][]) {
  return input.reduce((acc, line) => acc + resolveNumberPair(line), 0);
}

console.log(resolveSumOfLines(exampleInput));
console.log(resolveSumOfLines(input));
