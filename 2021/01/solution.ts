import { exampleInput, input } from "./inputs.ts";
import { countDepthIncrease, createMeasurementWindows, sum } from "./utils.ts";

function determinesDepthIncrease(input: number[]) {
  return countDepthIncrease(input);
}

console.log(determinesDepthIncrease(exampleInput));
console.log(determinesDepthIncrease(input));

function calculateDepthIncreaseWithWindows(input: number[]) {
  const windows = createMeasurementWindows(input, 3);
  const windowsSummedUp = windows.map((window) => sum(window));
  return countDepthIncrease(windowsSummedUp);
}

console.log(calculateDepthIncreaseWithWindows(exampleInput));
console.log(calculateDepthIncreaseWithWindows(input));