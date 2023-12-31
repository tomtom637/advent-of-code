import { exampleInput, input } from "./inputs.ts";
import {
  validateFullCategory,
  resolveSeedsRange,
  validateFullCategoryWithSeedRange,
} from "./utils.ts";

type Input = typeof input;

export function partOne(input: Input) {
  const results: number[] = [];
  const seeds = input.seeds;
  const categories = Object.keys(input).filter(
    key => key !== "seeds"
  ) as (keyof Omit<Input, "seeds">)[];

  for (const seed of seeds) {
    let seedValue = seed;

    for (const category of categories) {
      seedValue = validateFullCategory(input[category], seedValue);
    }
    results.push(seedValue);
  }
  return Math.min(...results);
}

console.log("Part One:", partOne(exampleInput));
console.log("Part One:", partOne(input));

export function partTwo(input: Input) {
  const results: number[] = [];
  const seedsRange = resolveSeedsRange(input.seeds);
  const categories = Object.keys(input).filter(
    key => key !== "seeds"
  ) as (keyof Omit<Input, "seeds">)[];

  for (const seed of seedsRange) {
    const { start: seedStart, range: seedRange } = seed;

    const firstCategoryOutput = validateFullCategoryWithSeedRange(
      { seedStart, seedRange },
      input[categories[0]],
    );

    let seedValue = firstCategoryOutput;

    for (let i = 1; i < categories.length; i++) {
      seedValue = validateFullCategory(input[categories[i]], seedValue);
    }
    results.push(seedValue);
  }
  return Math.min(...results);
}

console.log("Part Two:", partTwo(exampleInput));
console.log("Part Two:", partTwo(input));
