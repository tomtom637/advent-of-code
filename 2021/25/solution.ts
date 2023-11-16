import { input } from "./input.ts";
import {
  convertMatrixToString,
  makeMatrixCopy,
  getRow,
  getColumn,
  shouldMoveEast,
  shouldMoveSouth,
  moveEast,
  moveSouth
} from "./utils.ts";

const encoder = new TextEncoder();
let output = "";

/** Determines the number of iterations before all cucumbers get stuck and can no longer move, given a matrix */
function determineWhenStuck(matrix: string[][]) {
  let stuck = false;
  let hasMoved = false;
  let iterationCount = 0;

  output += `${iterationCount}:\n` + convertMatrixToString(matrix) + "\n\n";

  while (!stuck) {
    iterationCount++;
    // Calculate the east facing cucumbers first
    for (let i = 0; i < matrix.length; i++) {
      let row = getRow(makeMatrixCopy(matrix), i);
      // Iterate over each cucumber in the row
      for (let j = 0; j < row.length; j++) {
        if (shouldMoveEast(getRow(matrix, i), j)) {
          row = moveEast(row, j);
          hasMoved = true;
        }
      }
      // Update the matrix with the new row
      matrix[i] = row;
    }
    // Calculate the south facing cucumbers second
    for (let i = 0; i < matrix[0].length; i++) {
      let column = getColumn(makeMatrixCopy(matrix), i);
      // Iterate over each cucumber in the column
      for (let j = 0; j < column.length; j++) {
        if (shouldMoveSouth(getColumn(matrix, i), j)) {
          column = moveSouth(column, j);
          hasMoved = true;
        }
      }
      // Update the matrix with the new column
      for (let j = 0; j < matrix.length; j++) {
        matrix[j][i] = column[j];
      }
    }
    if (!hasMoved) {
      stuck = true;
    }
    hasMoved = false;
    output += `${iterationCount}:\n` + convertMatrixToString(matrix) + "\n\n";
  }
  return iterationCount;
}

console.time("determineWhenStuck");
console.log(determineWhenStuck(input));
console.timeEnd("determineWhenStuck");

Deno.writeFile("./25/output.txt", encoder.encode(output));
