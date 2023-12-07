import { exampleInput as input } from "./inputs.ts";

type Input = typeof input;
type Categories = Omit<Input, "seeds">;
type CategoryLine = Categories[keyof Categories];

/** Is at range */
export function isAtRange(value: number, startAt: number, range: number) {
  return value >= startAt && value < startAt + range;
}

/** Is at seed range */
export function isAtSeedRange(
  seedStart: number,
  seedRange: number,
  startAt: number,
  range: number
) {
  return (
    seedStart + seedRange >= startAt && seedStart + seedRange < startAt + range
  );
}

/** Calculate Range */
export function getRange(value: number, startAt: number) {
  return value - startAt;
}

/** Validate and resolve a category line */
export function validateCategoryLine(
  seedValue: number,
  {
    source,
    destination,
    range,
  }: {
    source: number;
    destination: number;
    range: number;
  }
) {
  if (isAtRange(seedValue, source, range)) {
    return destination + getRange(seedValue, source);
  }
  return seedValue;
}

/** Validate and resolve a category line with seed range */
export function validateCategoryLineWithSeedRange(
  {
    seedStart,
    seedRange,
  }: {
    seedStart: number;
    seedRange: number;
  },
  {
    source,
    destination,
    range,
  }: {
    source: number;
    destination: number;
    range: number;
  }
) {
  let result = seedStart;
  let earlyReturn = false;
  for (let i = seedStart; i < seedStart + seedRange; i++) {
    if (isAtRange(i, source, range)) {
      result = destination + getRange(i, source);
      earlyReturn = true;
      break;
    }
  }
  return { result, earlyReturn };
}

/** Get Source, Destination and Range from a line */
export function getSDR(line: number[]) {
  const [destination, source, range] = line;
  return { source, destination, range };
}

export function validateFullCategory(
  category: CategoryLine,
  seedValue: number
) {
  if (!category) {
    throw new Error("Category is not defined");
  }
  let result = seedValue;
  for (const line of category) {
    const { source, destination, range } = getSDR(line);
    if (isAtRange(seedValue, source, range)) {
      result = validateCategoryLine(seedValue, { source, destination, range });
      break;
    }
  }
  return result;
}

export function validateFullCategoryWithSeedRange(
  seedInfo: { seedStart: number; seedRange: number; },
  category: CategoryLine,
) {
  let result = seedInfo.seedStart;
  for (const line of category) {
    const { source, destination, range } = getSDR(line);
    const categoryLine = validateCategoryLineWithSeedRange(seedInfo, { source, destination, range })
    if (categoryLine.earlyReturn) {
      result = categoryLine.result;
      break;
    }
  }
  return result;
}

export function resolveSeedsRange(seeds: number[]) {
  const seedRanges = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seedRanges.push([seeds[i], seeds[i + 1]]);
  }
  return seedRanges.map(([start, range]) => ({ start, range }));
}
