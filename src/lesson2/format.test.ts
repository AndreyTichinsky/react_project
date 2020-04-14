import { format } from "./format";

describe("format test cases", () => {
  it("format 11 * 2 + (3 - (10 - 6)) to equal 11 * 2 + ( 3 - ( 10 - 6 ) )", () => {
    expect(format("11 * 2 + (3 - (10 - 6))")).toBe(
      "11 * 2 + ( 3 - ( 10 - 6 ) )"
    );
  });
  it("format fib(10 - !3) ** to equal fib ( 10 - ! 3 ) ^ 2", () => {
    expect(format("fib(10 - !3) **")).toBe("fib ( 10 - ! 3 ) ^ 2");
  });
});
