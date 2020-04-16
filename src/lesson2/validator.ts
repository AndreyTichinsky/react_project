import { SplittedString } from "./calculator";
export const validator = (splittedLine: SplittedString): string[] => {
  const regexp = new RegExp(/fib|sin|cos|tan|[0-9]+|[-+*/^!()]/, "");
  const report: string[] = [];
  splittedLine.forEach((str) => {
    if (!regexp.test(String(str))) {
      report.push(`\nNot valid symbol: ${str}`);
    }
  });
  return report;
};
