import { exampleInput, exampleInput2, input } from "./inputs.ts";
import {
  filterStringToNumberArray,
  replaceCharNumbers,
  resolveNumberPair,
} from "./utils.ts";

function resolveSumOfLines(input: string[]) {
  const matrixOfNumbers = input.map(line => filterStringToNumberArray(line));
  return matrixOfNumbers.reduce(
    (acc, line) => acc + resolveNumberPair(line),
    0
  );
}

function resolveSumOfLines2(input: string[]) {
  const inputWithNumbers = input.map(line => replaceCharNumbers(line));
  const matrixOfNumbers = inputWithNumbers.map(line =>
    filterStringToNumberArray(line)
  );
  return matrixOfNumbers.reduce(
    (acc, line) => acc + resolveNumberPair(line),
    0
  );
}

console.log(resolveSumOfLines(exampleInput));
console.log(resolveSumOfLines(input));

console.log(resolveSumOfLines2(exampleInput2));
console.log(resolveSumOfLines2(input));
