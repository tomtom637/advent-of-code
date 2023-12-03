/** Convert string input to array of strings */
export function convertInputToString(input: string) {
  return input.split('\n');
}

/** Determines if a string character is a number */
export function isNumber(value: string) {
  return !isNaN(parseInt(value));
}

/** Determines if a string character is a dot */
export function isDot(value: string) {
  return value === '.';
}

/** Determines if a string character is a symbol */
export function isSymbol(value: string) {
  return !isNumber(value) && !isDot(value);
}

/** Finds the entire number following a certain index */
export function findNumber(input: string, index: number) {
  let number = '';
  let i = index;
  while (isNumber(input[i])) {
    number += input[i];
    i++;
  }
  return {
    number,
    indexRange: {
      start: index,
      end: i - 1,
    }
  };
}

type NumberData = {
  number: string;
  indexRange: {
    start: number;
    end: number;
  };
};

type SymbolData = {
  symbol: string;
  index: number;
};

type LineData = {
  columnIndex: number;
  numbers: NumberData[];
  symbols: SymbolData[];
};

/** Returns data from a line at a certain index  */
export function getLineData(input: string[], columnIndex: number) {
  const data: LineData = {
    columnIndex,
    numbers: [],
    symbols: [],
  };
  const line = input[columnIndex];
  let rowIndex = 0;
  while (rowIndex < line.length) {
    const value = line[rowIndex];
    if (isNumber(value)) {
      const { number, indexRange } = findNumber(line, rowIndex);
      data.numbers.push({ number, indexRange });
      rowIndex = indexRange.end + 1;
    } else if (isSymbol(value)) {
      data.symbols.push({ symbol: value, index: rowIndex });
      rowIndex++;
    } else {
      rowIndex++;
    }
  }
  return data;
}

/** Determines if a number is adjacent to a symbol index */
export function isAdjacentToSymbolIndex(number: NumberData, symbolIndex: number) {
  const numberStart = number.indexRange.start;
  const numberEnd = number.indexRange.end;
  const adjacentStart = numberStart > 0 ? numberStart - 1 : numberStart;
  const adjacentEnd = numberEnd + 1;
  return symbolIndex >= adjacentStart && symbolIndex <= adjacentEnd;
}

/** Return gear ratio */
export function getGearRatio(selectedSymbol: SymbolData, lines: LineData[], columnIndex: number) {
  const { symbol } = selectedSymbol;
  if (symbol !== '*') return 0;
  const allNumbers = [];
  if (columnIndex === 0) {
    allNumbers.push(...lines[columnIndex].numbers
      .filter(number => isAdjacentToSymbolIndex(number, selectedSymbol.index)));
    allNumbers.push(...lines[columnIndex + 1].numbers
      .filter(number => isAdjacentToSymbolIndex(number, selectedSymbol.index)));
  }
  if (columnIndex === lines.length - 1) {
    allNumbers.push(...lines[columnIndex - 1].numbers
      .filter(number => isAdjacentToSymbolIndex(number, selectedSymbol.index)));
    allNumbers.push(...lines[columnIndex].numbers
      .filter(number => isAdjacentToSymbolIndex(number, selectedSymbol.index)));
  }
  allNumbers.push(...lines[columnIndex - 1].numbers
    .filter(number => isAdjacentToSymbolIndex(number, selectedSymbol.index)));
  allNumbers.push(...lines[columnIndex].numbers
    .filter(number => isAdjacentToSymbolIndex(number, selectedSymbol.index)));
  allNumbers.push(...lines[columnIndex + 1].numbers
    .filter(number => isAdjacentToSymbolIndex(number, selectedSymbol.index)));

  if (allNumbers.length === 2) {
    return parseInt(allNumbers[0].number) * parseInt(allNumbers[1].number);
  }
  return 0;
}

/** Determines if a number is adjacent to a symbol on a line */
export function isAdjacentToSymbol(number: NumberData, line: LineData) {
  const numberStart = number.indexRange.start;
  const numberEnd = number.indexRange.end;
  const { symbols } = line;
  const adjacentStart = numberStart > 0 ? numberStart - 1 : numberStart;
  const adjacentEnd = numberEnd + 1;
  for (let i = adjacentStart; i <= adjacentEnd; i++) {
    if (symbols.some(symbol => symbol.index === i)) {
      return true;
    }
  }
  return false;
}

/** Check for a number should be returned */
export function shouldReturnNumber(selectedNumber: NumberData, lines: LineData[], columnIndex: number) {
  if (columnIndex === 0) {
    return isAdjacentToSymbol(selectedNumber, lines[columnIndex])
      || isAdjacentToSymbol(selectedNumber, lines[columnIndex + 1]);
  }
  if (columnIndex === lines.length - 1) {
    return isAdjacentToSymbol(selectedNumber, lines[columnIndex - 1])
      || isAdjacentToSymbol(selectedNumber, lines[columnIndex]);
  }
  return isAdjacentToSymbol(selectedNumber, lines[columnIndex - 1])
    || isAdjacentToSymbol(selectedNumber, lines[columnIndex])
    || isAdjacentToSymbol(selectedNumber, lines[columnIndex + 1]);
}
