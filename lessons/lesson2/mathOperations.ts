export const mul = (a: number, b: number): number => a * b;

export const div = (a: number, b: number): number => a / b;

export const add = (a: number, b: number): number => a + b;

export const minus = (a: number, b: number): number => a - b;

export const cos = (a: number): number => Math.cos(a);

export const sin = (a: number): number => Math.sin(a);

export const tan = (a: number): number => Math.tan(a);

export const pow = (a: number, x: number): number => Math.pow(a, x);

export const square = (a: number): number => Math.pow(a, 2);

export const fib = (num: number): number => {
  let [prev, next] = [0, 1];
  for (let i = 0; i < num; i++) {
    [next, prev] = [next + prev, next];
  }
  return prev;
};

export const factorial = (num: number): number => {
  return num !== 1 ? num * factorial(num - 1) : 1;
};

export const mathOperators = {
  "*": mul,
  "/": div,
  "+": add,
  "-": minus,
  fib: fib,
  cos: cos,
  tan: tan,
  sin: sin,
  "!": factorial,
  "^": pow,
};

export const mathPriorities: number[] = [1, 2, 3];

const [FIRST, SECOND, THIRD] = mathPriorities;

export const mathOperatorsPriorities = {
  "!": FIRST,
  "^": FIRST,
  "*": SECOND,
  "/": SECOND,
  "+": THIRD,
  "-": THIRD,
};
