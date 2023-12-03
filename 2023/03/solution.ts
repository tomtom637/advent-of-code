import { exampleInput, input } from "./inputs.ts";

import { getLineData, shouldReturnNumber, getGearRatio } from "./utils.ts";

export function getSolution(input: string[]) {
  const numbers = [];
  const lines = input.map((_, index) => getLineData(input, index));
  for (const line of lines) {
    for (const number of line.numbers) {
      if (shouldReturnNumber(number, lines, line.columnIndex)) {
        numbers.push(number);
      }
    }
  }
  return numbers.reduce((acc, { number }) => acc + parseInt(number), 0);
}

export function getSolution2(input: string[]) {
  const ratios = [];
  const lines = input.map((_, index) => getLineData(input, index));
  for (const line of lines) {
    for (const symbol of line.symbols) {
      const ratio = getGearRatio(symbol, lines, line.columnIndex);
      ratios.push(ratio);
    }
  }
  return ratios.reduce((acc, ratio) => acc + ratio, 0);
}

console.log(getSolution(exampleInput));
console.log(getSolution(input));

console.log(getSolution2(exampleInput));
console.log(getSolution2(input));
