import {
  mul,
  div,
  add,
  minus,
  factorial,
  fib,
  cos,
  sin,
  tan,
  pow,
  square,
} from "./mathOperations";

describe("mathOperations test cases", () => {
  it("mul 1 * 2 to equal 2", () => {
    expect(mul(1, 2)).toBe(2);
  });

  it("mul 2 * 2 to equal 4", () => {
    expect(mul(2, 2)).toBe(4);
  });

  it("div 2 / 2 to equal 1", () => {
    expect(div(2, 2)).toBe(1);
  });

  it("div 4 / 2 to equal 2", () => {
    expect(div(4, 2)).toBe(2);
  });

  it("add 4 + 2 to equal 6", () => {
    expect(add(4, 2)).toBe(6);
  });

  it("minus 4 - 2 to equal 2", () => {
    expect(minus(4, 2)).toBe(2);
  });

  it("fib 12 to equal 144", () => {
    expect(fib(12)).toBe(144);
  });

  it("fib 10 to equal 55", () => {
    expect(fib(10)).toBe(55);
  });

  it("factorial 5 to equal 120", () => {
    expect(factorial(5)).toBe(120);
  });

  it("factorial 6 to equal 720", () => {
    expect(factorial(6)).toBe(720);
  });

  it("pow 5 ^ 2 to equal 25", () => {
    expect(pow(5, 2)).toBe(25);
  });

  it("pow 3 ^ 3 to equal 27", () => {
    expect(pow(3, 3)).toBe(27);
  });

  it("square 6 ** to equal 36", () => {
    expect(square(6)).toBe(36);
  });

  it("square 10 ** to equal 100", () => {
    expect(square(10)).toBe(100);
  });

  it("sin 1 to equal 0.8414709848078965", () => {
    expect(sin(1)).toBe(0.8414709848078965);
  });

  it("cos 1 to equal 0.5403023058681398", () => {
    expect(cos(1)).toBe(0.5403023058681398);
  });

  it("tan 1 to equal 1.5574077246549023", () => {
    expect(tan(1)).toBe(1.5574077246549023);
  });
});
