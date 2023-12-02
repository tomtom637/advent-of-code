import { exampleInput, input } from "./inputs.ts";
import {
  getLineInfos,
  shouldFilterLine,
  calculatePowerOfSet,
} from "./utils.ts";

const filterRules = { red: 12, green: 13, blue: 14 };

export function findSumOfIds(input: string[]) {
  const linesInfos = input.map(line => getLineInfos(line));
  const filteredLines = linesInfos.filter(line => !shouldFilterLine(line, filterRules));
  const sumOfIds = filteredLines.reduce((acc, line) => acc + line.id, 0);
  return sumOfIds;
}

export function findPowerOfSet(input: string[]) {
  const linesInfos = input.map(line => getLineInfos(line));
  const powerOfSet = linesInfos.reduce((acc, line) => acc + calculatePowerOfSet(line), 0);
  return powerOfSet;
}

console.log(findSumOfIds(exampleInput));
console.log(findSumOfIds(input));

console.log(findPowerOfSet(exampleInput));
console.log(findPowerOfSet(input));
