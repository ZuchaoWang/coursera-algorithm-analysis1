import countTwoSum from '../src/counttwosum';

describe('countTwoSum', () => {
  let arr1 = [
      /* beautify preserve:start */
      68037543430,
      -21123414637,
      56619844751,
      59688006695,
      82329471587,
      21123414637,
      3,
      -60489726142,
      2,
      2,
      -32955448858,
      32955438858,
      53645918962,
      -44445057840,
      10793991159
      /* beautify preserve:end */
    ],
    arr2 = [
      /* beautify preserve:start */
      1,
      -1,
      2,
      -2
      /* beautify preserve:end */
    ];

  it('should work correctly', () => {
    expect(countTwoSum(arr1, -10000, 10000)).toBe(3);
    expect(countTwoSum(arr2, -10000, 10000)).toBe(5);
  });
});
