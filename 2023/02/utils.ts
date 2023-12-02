/** Converts the string input to an array of string */
export function convertStringInputToArray(input: string) {
  return input.split("\n");
}

/** Retrieve colors from a hand-full */
export function getColorsFromHandful(handful: string) {
  let red = 0;
  let green = 0;
  let blue = 0;
  const colors = handful.trim().split(",").map(color => color.trim());
  colors.forEach(color => {
    switch (color.split(" ")[1]) {
      case "red":
        red += parseInt(color.split(" ")[0]);
        break;
      case "green":
        green += parseInt(color.split(" ")[0]);
        break;
      case "blue":
        blue += parseInt(color.split(" ")[0]);
        break;
      default: break;
    }
  });
  return { red, green, blue };
}

/** Retrieve infos from a line */
export function getLineInfos(line: string) {
  let red = 0;
  let green = 0;
  let blue = 0;
  const id = parseInt(line.split(" ")[1].split(":")[0]);
  const handfuls = line.split(":")[1].split(";");
  handfuls.forEach(handful => {
    const colors = getColorsFromHandful(handful);
    colors.red > red ? red = colors.red : "";
    colors.green > green ? green = colors.green : "";
    colors.blue > blue ? blue = colors.blue : "";
  });
  return { id, red, green, blue };
}

type FilterRules = {
  red: number;
  green: number;
  blue: number;
};

type LineInfos = { id: number } & FilterRules; 

/** Decides whether to filter a line */
export function shouldFilterLine(line: LineInfos, filterRules: FilterRules) {
  return line.red > filterRules.red ||
    line.green > filterRules.green ||
    line.blue > filterRules.blue;
}

/** Calculate power of a set */
export function calculatePowerOfSet(set: LineInfos) {
  return set.blue * set.green * set.red;
}
