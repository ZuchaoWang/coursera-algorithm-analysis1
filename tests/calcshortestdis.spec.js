import calcShortestDis from '../src/calcshortestdis';

describe('calcShortestDis', () => {
  let gAl = [
    [
      [1, 1],
      [7, 2]
    ],
    [
      [0, 1],
      [2, 1]
    ],
    [
      [1, 1],
      [3, 1]
    ],
    [
      [2, 1],
      [4, 1]
    ],
    [
      [3, 1],
      [5, 1]
    ],
    [
      [4, 1],
      [6, 1]
    ],
    [
      [5, 1],
      [7, 1]
    ],
    [
      [6, 1],
      [0, 2]
    ]
  ];

  it('should work correctly', () => {
    expect(calcShortestDis(gAl, 0)).toEqual([0, 1, 2, 3, 4, 4, 3, 2]);
  });
});
