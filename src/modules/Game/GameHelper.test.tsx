import * as helper from "./GameHelper";

describe("Game helpers testing", () => {
  it("makeMatrix test with 0 percent", () => {
    expect(helper.makeMatrix(2, 2, 0)).toStrictEqual([0, 0, 0, 0]);
  });
  it("makeMatrix check correct percentage with calculatePercentage function", () => {
    const testMatrix = helper.makeMatrix(2, 2, 50);
    expect(helper.calculatePercentage(testMatrix)).toEqual(50);
  });
  it("makeEmptyMatrix test", () => {
    expect(helper.makeEmptyMatrix(2, 2)).toStrictEqual([0, 0, 0, 0]);
  });
  it("shuffle test length of output array", () => {
    const shuffleArray = helper.shuffle([1, 2, 3, 4, 5, 6], 3);
    expect(shuffleArray.length).toEqual(3);
  });
  it("mergeMatrices test", () => {
    const matrixMain = [0, 1, 1, 1, 0, 1, 1, 1, 0];
    expect(helper.mergeMatrices(matrixMain, 3, 3, 4, 4)).toStrictEqual([
      0,
      1,
      1,
      0,
      1,
      0,
      1,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
    ]);
  });
  it("matrixSum test", () => {
    const matrixMain = [0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0];
    expect(helper.matrixSum(matrixMain)).toEqual(6);
  });
  it("calculatePercentage test", () => {
    const matrixMain = [0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1];
    expect(helper.calculatePercentage(matrixMain)).toEqual(50);
  });
  it("getNeighbours test", () => {
    expect(helper.getNeighbours(0, 0, 10, 10)).toStrictEqual([
      99,
      90,
      91,
      9,
      1,
      19,
      10,
      11,
    ]);
    expect(helper.getNeighbours(0, 0, 9, 10)).toStrictEqual([
      89,
      80,
      81,
      9,
      1,
      19,
      10,
      11,
    ]);
    expect(helper.getNeighbours(0, 0, 10, 9)).toStrictEqual([
      89,
      81,
      82,
      8,
      1,
      17,
      9,
      10,
    ]);
  });
});
