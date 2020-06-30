import { SplittedString } from "./calculator";

export const isNumber = (item: string): boolean => !isNaN(Number(item));

export const checkLengthEqualsOne = (splittedLine: SplittedString): boolean => {
  return splittedLine.length === 1;
};
