/** Converts the string input to an array of string */
export function convertStringInputToArray(input: string) {
  return input.split("\n");
}

/** Filters a string to only keep the numbers and returns an array of numbers */
export function filterStringToNumberArray(input: string) {
  return input
    .split("")
    .map(n => parseInt(n, 10))
    .filter(n => !isNaN(n));
}

const charNumbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

/** Replaces charNumbers with their number value */
export function replaceCharNumbers(input: string) {
  for (const [key, value] of Object.entries(charNumbers)) {
    input = input.replaceAll(key, `${key}${value.toString()}${key}`);
  }
  return input;
}

export function resolveNumberPair(input: number[]) {
  switch (input.length) {
    case 0:
      return 0;
    case 1:
      return parseInt(input[0].toString() + input[0].toString(), 10);
    case 2:
      return parseInt(input[0].toString() + input[1].toString(), 10);
    default:
      return parseInt(
        input[0].toString() + input[input.length - 1].toString(),
        10
      );
  }
}
