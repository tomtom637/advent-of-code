/** Converts the string input to a matrix of bits */
export function convertStringInputToMatrix(input: string) {
  return input.split("\n").map(row => row.split("").map(bit => parseInt(bit)));
}

/** Returns a column by index */
export function getColumn(matrix: number[][], columnIndex: number) {
  return matrix.map(row => row[columnIndex]);
}

/** Calculate the bit value from a column analysis */
export function calculateBitFromColumn(column: number[]) {
  const totalScore = column.reduce((acc, bit) => acc + bit, 0);
  return totalScore > column.length / 2 ? "1" : "0";
}

/** Resolve gamma and epsilon from bit string */
export function resolveGammaAndEpsilon(bitString: string) {
  const gamma = parseInt(bitString, 2);
  const epsilon = parseInt(
    bitString
      .split("")
      .map(bit => (bit === "0" ? "1" : "0"))
      .join(""),
    2
  );
  return [gamma, epsilon];
}
