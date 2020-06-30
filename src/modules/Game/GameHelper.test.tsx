import * as helper from "./GameHelper";

describe("Game helpers testing", () => {
  it("makeMatrix test with 0 percent", () => {
    expect(helper.makeMatrix(2, 2, 0)).toStrictEqual([
      [false, false],
      [false, false],
    ]);
  });
  it("makeMatrix check correct percentage with calculatePercentage function", () => {
    const testMatrix = helper.makeMatrix(2, 2, 50);
    expect(helper.calculatePercentage(testMatrix)).toEqual(50);
  });
  it("makeEmptyMatrix test", () => {
    expect(helper.makeEmptyMatrix(2, 2)).toStrictEqual([
      [false, false],
      [false, false],
    ]);
  });
  it("shuffle test length of output array", () => {
    const shuffleArray = helper.shuffle(
      [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
      ],
      3
    );
    expect(shuffleArray.length).toEqual(3);
  });
  it("mergeMatrices test", () => {
    const matrixMain = [
      [false, true, true],
      [true, false, true],
      [true, true, false],
    ];
    const matrixSec = [
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
    ];
    expect(helper.mergeMatrices(matrixMain, matrixSec)).toStrictEqual([
      [false, true, true, false],
      [true, false, true, false],
      [true, true, false, false],
      [false, false, false, false],
    ]);
  });
  it("matrixSum test", () => {
    const matrixMain = [
      [false, true, true, false],
      [true, false, true, false],
      [true, true, false, false],
      [false, false, false, false],
    ];
    expect(helper.matrixSum(matrixMain)).toEqual(6);
  });
  it("calculatePercentage test", () => {
    const matrixMain = [
      [false, true, true, false],
      [true, false, true, false],
      [true, true, false, false],
      [false, false, true, true],
    ];
    expect(helper.calculatePercentage(matrixMain)).toEqual(50);
  });
  it("getNeighbours test", () => {
    expect(helper.getNeighbours(0, 0, 10, 10)).toStrictEqual([
      [9, 9],
      [9, 0],
      [9, 1],
      [0, 9],
      [0, 1],
      [1, 9],
      [1, 0],
      [1, 1],
    ]);
    expect(helper.getNeighbours(0, 0, 9, 10)).toStrictEqual([
      [9, 8],
      [9, 0],
      [9, 1],
      [0, 8],
      [0, 1],
      [1, 8],
      [1, 0],
      [1, 1],
    ]);
    expect(helper.getNeighbours(0, 0, 10, 9)).toStrictEqual([
      [8, 9],
      [8, 0],
      [8, 1],
      [0, 9],
      [0, 1],
      [1, 9],
      [1, 0],
      [1, 1],
    ]);
  });
});
