import { engine } from "./engine";
import { validator } from "./validator";

export type SplittedString = (number | string)[];

export const calculator = (line: string) => {
  const bracketsCache: number[] = [],
    splittedLine: SplittedString = line.split(" ");
  const errors = validator(splittedLine);
  if (errors.length > 0) {
    throw new TypeError(errors.reduce((acc, cur) => acc + cur, ""));
  }
  for (let i = 0; i < splittedLine.length; i++) {
    if (splittedLine[i] === "(") {
      bracketsCache.push(i);
    } else if (splittedLine[i] === ")") {
      const lastSeenBracket = bracketsCache.pop(),
        toCalculate = splittedLine.slice(lastSeenBracket, i + 1);
      splittedLine.splice(
        lastSeenBracket,
        toCalculate.length,
        String(engine(toCalculate))
      );
      i = lastSeenBracket;
    }
  }
  if (splittedLine.length === 1) {
    return Number(splittedLine[0]);
  }
  return engine(splittedLine);
};
