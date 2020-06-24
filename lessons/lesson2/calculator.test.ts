import { calculator } from "./calculator";

describe("calculator test cases", () => {
  it("calculator 11 * 2 + ( 3 - ( 10 - 6 ) ) to equal 21", () => {
    expect(calculator("11 * 2 + ( 3 - ( 10 - 6 ) )")).toBe(21);
  });
  it("calculator ( 20 - ( 9 * 7 ) + 100 ) / 19 to equal 3", () => {
    expect(calculator("( 20 - ( 9 * 7 ) + 100 ) / 19")).toBe(3);
  });
  it("calculator fib ( 11 + ! 3 ) to equal 1597", () => {
    expect(calculator("fib ( 11 + ! 3 )")).toBe(1597);
  });
  it("calculator ( ( ( ( ( ( ( fib ( ! 3 ) ) ) ) ) ) ) ) to equal 8", () => {
    expect(calculator("( ( ( ( ( ( ( fib ( ! 3 ) ) ) ) ) ) ) )")).toBe(8);
  });
  it("calculator fib ( 10 ) ^ 2 to equal 3025", () => {
    expect(calculator("fib ( 10 ) ^ 2")).toBe(3025);
  });
});
