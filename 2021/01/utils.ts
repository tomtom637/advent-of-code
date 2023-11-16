/** Converts the string input to an array of numbers */
export function convertStringInputToArray(input: string) {
  return input.split("\n").map((n) => parseInt(n));
}

/** Counts the number of times the depth has increased */
export function countDepthIncrease(input: number[]) {
  let increaseCount = 0;
  for (let i = 1; i < input.length; i++) {
    if (i !== 0 && input[i] > input[i - 1]) {
      increaseCount++;
    }
  }
  return increaseCount;
}

/** Creates a matrix of measurement windows */
export function createMeasurementWindows(input: number[], windowSize: number) {
  if (input.length < windowSize) return [input];
  const windows = [];
  for (let i = 0; i < input.length - (windowSize - 1); i++) {
    windows.push(input.slice(i, i + windowSize));
  }
  return windows;
}

/** Calculate the sum of numbers in an array */
export function sum(numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0);
}