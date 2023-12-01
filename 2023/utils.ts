/** Converts the string input to an array of numbers */
export function convertStringInputToMatrix(input: string) {
  return input.split("\n").map((n) => n.split("").map((n) => parseInt(n, 10)).filter((n) => !isNaN(n)));
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
      return parseInt(input[0].toString() + input[input.length - 1].toString(), 10);
  }
}
