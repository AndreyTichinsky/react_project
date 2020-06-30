import {
  engine,
  priorityCalc,
  thirdPriorityCalc,
  functionCalc,
} from "./engine";

describe("engine test cases", () => {
  it("engine ['(', '10', '-', '6', '^',  '2', ')' ]", () => {
    expect(engine(["(", "10", "-", "6", "^", "2", ")"])).toBe(-26);
  });
  it("engine ['(', 'fib', '10', '-', '6', '^', '!', 2', ')' ]", () => {
    expect(engine(["(", "fib", "10", "-", "6", "^", "!", "2", ")"])).toBe(19);
  });
  it("functionCalc [ 'fib', '5', '+', '!', '6' ]", () => {
    expect(functionCalc(["fib", "5", "+", "!", "6"], null)).toStrictEqual([
      5,
      "+",
      720,
    ]);
  });
  it("priorityCalc [ '11', '^', '2', '+', '6' ]", () => {
    expect(priorityCalc(["11", "^", "2", "+", "6"], 1)).toStrictEqual([
      121,
      "+",
      "6",
    ]);
  });
  it("priorityCalc [ '11', '*', '2', '+', '6' ]", () => {
    expect(priorityCalc(["11", "*", "2", "+", "6"], 2)).toStrictEqual([
      22,
      "+",
      "6",
    ]);
  });
  it("thirdPriorityCalc [ 2', '+', '6' ]", () => {
    expect(thirdPriorityCalc(["2", "+", "6"], null)).toBe(8);
  });
});
