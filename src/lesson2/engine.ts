import { SplittedString } from "./calculator";
import {
  mathOperators,
  mathOperatorsPriorities,
  mathPriorities,
} from "./mathOperations";

import { isNumber, checkLengthEqualsOne } from "./helpers";

const [FIRST, SECOND, THIRD] = mathPriorities;

export const engine = (splittedLine: SplittedString) => {
  splittedLine = splittedLine.join(" ").replace(/\(|\)/g, "").trim().split(" ");
  let gotResult = false;
  const queueWork = queue.reduce((acc, { cb, priority }, idx, arr) => {
    const res = gotResult ? acc : cb(acc, priority);
    if (!gotResult && checkLengthEqualsOne(res)) {
      gotResult = true;
      return Number(res[0]);
    }
    return res;
  }, splittedLine.slice());

  return queueWork;
};

export const functionCalc = (
  splittedLine: SplittedString,
  priority: number | null
): SplittedString => {
  const regexp = new RegExp(/sin|cos|tan|fib|!/, "i");
  return splittedLine.reduce<SplittedString>((acc, cur) => {
    const prevItem = acc[acc.length - 1];

    if (isNumber(String(cur)) && regexp.test(String(prevItem))) {
      acc = [...acc.slice(0, -1), mathOperators[prevItem](cur)];
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
};

export const priorityCalc = (
  splittedLine: SplittedString,
  priority: number | null
): SplittedString => {
  return splittedLine.reduce<SplittedString>((acc, curItem) => {
    const prevItem = acc[acc.length - 2];
    const item = acc[acc.length - 1];

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === priority) {
      acc = [...acc.slice(0, -2), mathOperators[item](prevItem, curItem)];
    } else {
      acc.push(curItem);
    }
    return acc;
  }, []);
};

export const thirdPriorityCalc = (
  splittedLine: SplittedString,
  priority: number | null
): number => {
  return splittedLine.reduce<number>((acc, curItem, idx, arr) => {
    const item = arr[idx - 1];
    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === THIRD) {
      acc = mathOperators[item](Number(acc), Number(curItem));
    }
    return acc;
  }, Number(splittedLine[0]));
};

const queue = [
  { cb: functionCalc, priority: null },
  { cb: priorityCalc, priority: FIRST },
  { cb: priorityCalc, priority: SECOND },
  { cb: thirdPriorityCalc, priority: null },
];
