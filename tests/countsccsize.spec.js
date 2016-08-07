import countSccSize from '../src/countsccsize';

describe('countSccSize', () => {
  let gAl1 = [
      [3],
      [7],
      [5],
      [6],
      [1],
      [8],
      [0],
      [4, 5],
      [6, 2]
    ],
    gAl2 = [
      [1],
      [5, 2, 3],
      [0, 3],
      [4],
      [3],
      [4, 6],
      [5, 7],
      [4, 6]
    ],
    gAl3 = [
      [1],
      [2],
      [0, 3],
      [],
      [3],
      [3, 6],
      [7],
      [5]
    ],
    gAl4 = [
      [1],
      [2],
      [0, 3],
      [2, 5],
      [3],
      [3, 6],
      [7],
      [5]
    ];

  it('should work correctly', () => {
    expect(countSccSize(gAl1)).toEqual([3, 3, 3]);
    expect(countSccSize(gAl2)).toEqual([3, 3, 2]);
    expect(countSccSize(gAl3)).toEqual([3, 3, 1, 1]);
    expect(countSccSize(gAl4)).toEqual([7, 1]);
  });
});
