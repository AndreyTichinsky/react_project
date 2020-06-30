import { validator } from "./validator";

describe("validator test cases", () => {
  it("[11, *, 2, %, (, 3, -, (, 10, -, 6, )]", () => {
    expect(
      validator(["11", "*", "2", "%", "(", "3", "-", "(", "10", "-", "6", ")"])
    ).toStrictEqual([`\nNot valid symbol: %`]);
  });
  it("[(, (, 9, %, 7, ), +, 100, ), =, 19]", () => {
    expect(
      validator(["(", "(", "9", "%", "7", ")", "+", "100", ")", "=", "19"])
    ).toStrictEqual(["\nNot valid symbol: %", "\nNot valid symbol: ="]);
  });
});
