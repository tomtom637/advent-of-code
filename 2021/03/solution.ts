import { exampleInput, input } from "./inputs.ts";
import {
  calculateBitFromColumn,
  getColumn,
  resolveGammaAndEpsilon,
} from "./utils.ts";

function determinesPowerConsumption(input: number[][]) {
  let bitString = "";
  const columns: number[][] = [];
  for (let i = 0; i < input[0].length; i++) {
    columns.push(getColumn(input, i));
  }
  for (const column of columns) {
    bitString += calculateBitFromColumn(column);
  }
  const [gamma, epsilon] = resolveGammaAndEpsilon(bitString);
  return gamma * epsilon;
}

console.log(determinesPowerConsumption(exampleInput));
console.log(determinesPowerConsumption(input));
