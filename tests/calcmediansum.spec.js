import calcMedianSum from '../src/calcmediansum';

describe('calcMedianSum', () => {
  let arr1 = [
      1,
      10,
      2,
      4
    ],
    arr2 = [
      6331,
      2793,
      1640,
      9290,
      225,
      625,
      6195,
      2303,
      5685,
      1354
    ],
    arr3 = [
      6331,
      2793,
      1640,
      9290,
      225,
      625,
      6195,
      2303,
      5685,
      1354,
      4292,
      7600,
      6447,
      4479,
      9046
    ];

  it('should work correctly', () => {
    expect(calcMedianSum(arr1)).toBe(6);
    expect(calcMedianSum(arr2)).toBe(29335);
    expect(calcMedianSum(arr3)).toBe(47984);
  });
});
