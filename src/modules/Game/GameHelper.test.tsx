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
  it("mergeMatrices increase x and y size", () => {
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
  it("mergeMatrices reduce x size", () => {
    const matrixMain = [0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0];
    expect(helper.mergeMatrices(matrixMain, 4, 4, 4, 3)).toStrictEqual([
      0,
      1,
      1,
      1,
      0,
      1,
      1,
      1,
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
  it("generationGenerator test", () => {
    const cache = helper.cacheNeighbours(helper.makeMatrix(4, 4, 0), 4, 4);
    expect(
      helper.generationGenerator(
        [1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0],
        cache
      )
    ).toEqual([1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0]);
  });
  it("cacheNeighbours test", () => {
    expect(helper.cacheNeighbours(helper.makeMatrix(4, 4, 0), 4, 4)).toEqual({
      "0": [15, 12, 13, 3, 1, 7, 4, 5],
      "1": [12, 13, 14, 0, 2, 4, 5, 6],
      "2": [13, 14, 15, 1, 3, 5, 6, 7],
      "3": [14, 15, 12, 2, 0, 6, 7, 4],
      "4": [3, 0, 1, 7, 5, 11, 8, 9],
      "5": [0, 1, 2, 4, 6, 8, 9, 10],
      "6": [1, 2, 3, 5, 7, 9, 10, 11],
      "7": [2, 3, 0, 6, 4, 10, 11, 8],
      "8": [7, 4, 5, 11, 9, 15, 12, 13],
      "9": [4, 5, 6, 8, 10, 12, 13, 14],
      "10": [5, 6, 7, 9, 11, 13, 14, 15],
      "11": [6, 7, 4, 10, 8, 14, 15, 12],
      "12": [11, 8, 9, 15, 13, 3, 0, 1],
      "13": [8, 9, 10, 12, 14, 0, 1, 2],
      "14": [9, 10, 11, 13, 15, 1, 2, 3],
      "15": [10, 11, 8, 14, 12, 2, 3, 0],
    });
  });
});

describe("asserts", () => {
  it("isNumber test", () => {
    expect(helper.isNumber(NaN)).toBeFalsy();
    expect(helper.isNumber(Infinity)).toBeFalsy();
    expect(helper.isNumber(-Infinity)).toBeFalsy();
    expect(helper.isNumber(null)).toBeFalsy();
    expect(helper.isNumber(undefined)).toBeFalsy();
    expect(helper.isNumber("")).toBeFalsy();
    expect(helper.isNumber({})).toBeFalsy();
    expect(helper.isNumber([])).toBeFalsy();
    expect(helper.isNumber(-1)).toBeTruthy();
    expect(helper.isNumber(0)).toBeTruthy();
    expect(helper.isNumber(42)).toBeTruthy();
  });
  it("assertSizeValue", () => {
    expect(helper.assertSizeValue(-1)).toBeFalsy();
    expect(helper.assertSizeValue(0)).toBeFalsy();
    expect(helper.assertSizeValue(1)).toBeTruthy();
    expect(helper.assertSizeValue(100)).toBeTruthy();
    expect(helper.assertSizeValue(999)).toBeTruthy();
  });
  it("assertPercentValue", () => {
    expect(helper.assertPercentValue(-1)).toBeFalsy();
    expect(helper.assertPercentValue(101)).toBeFalsy();
    expect(helper.assertPercentValue(0)).toBeTruthy();
    expect(helper.assertPercentValue(1)).toBeTruthy();
    expect(helper.assertPercentValue(100)).toBeTruthy();
  });
});
