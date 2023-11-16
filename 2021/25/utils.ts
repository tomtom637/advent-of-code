/** Converts the string input to a matrix of characters */
export function convertStringInputToMatrix(input: string) {
  return input.split("\n").map(row => row.split(""));
}

/** Converts the matrix of characters to a string */
export function convertMatrixToString(matrix: string[][]) {
  return matrix.map(row => row.join(" ")).join("\n");
}

/** Make a deep copy of the matrix */
export function makeMatrixCopy(matrix: string[][]) {
  return JSON.parse(JSON.stringify(matrix));
}

/** Check whether a cucumber is facing the east */
export function isEast(char: string) {
  return char === ">";
}

/** Check whether a cucumber is facing the south */
export function isSouth(char: string) {
  return char === "v";
}

/** Check whether a spot is empty */
export function isEmpty(char: string) {
  return char === ".";
}

/** Returns a row by index */
export function getRow(matrix: string[][], rowIndex: number) {
  return matrix[rowIndex];
}

/** Returns a column by index */
export function getColumn(matrix: string[][], columnIndex: number) {
  return matrix.map(row => row[columnIndex]);
}

/** Determines whether a cucumber should move east */
export function shouldMoveEast(row: string[], charIndex: number) {
  if (!isEast(row[charIndex])) return false;
  if (charIndex === row.length - 1) {
    return isEmpty(row[0]);
  }
  return isEmpty(row[charIndex + 1]);
}

/** Determines whether a cucumber should move south */
export function shouldMoveSouth(column: string[], charIndex: number) {
  if (!isSouth(column[charIndex])) return false;
  if (charIndex === column.length - 1) {
    return isEmpty(column[0]);
  }
  return isEmpty(column[charIndex + 1]);
}

/** Make an east facing cucumber move one step */
export function moveEast(row: string[], charIndex: number) {
  row[charIndex] = ".";
  if (charIndex === row.length - 1) {
    row[0] = ">";
    return row;
  }
  row[charIndex + 1] = ">";
  return row;
}

/** Make a south facing cucumber move one step */
export function moveSouth(column: string[], charIndex: number) {
  column[charIndex] = ".";
  if (charIndex === column.length - 1) {
    column[0] = "v";
    return column;
  }
  column[charIndex + 1] = "v";
  return column;
}
