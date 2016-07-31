import countMinCut from '../src/countmincut';

describe('countMinCut', () => {
  let g1 = [
      [1, 2, 3, 6],
      [0, 2, 3],
      [0, 1, 3],
      [0, 1, 2, 4],
      [3, 5, 6, 7],
      [4, 6, 7],
      [0, 4, 5, 7],
      [4, 5, 6]
    ],
    g2 = [
      [3, 1, 6, 2],
      [3, 0, 2],
      [0, 1, 3],
      [4, 0, 1, 2],
      [7, 6, 5, 3],
      [7, 4, 6],
      [5, 7, 4, 0],
      [6, 5, 4]
    ],
    g3 = [
      [1, 2, 3],
      [0, 2, 3],
      [0, 1, 3],
      [0, 1, 2, 4],
      [3, 5, 6, 7],
      [4, 6, 7],
      [4, 5, 7],
      [4, 5, 6]
    ],
    g4 = [
      [2, 3, 1],
      [0, 3, 2],
      [0, 1, 3],
      [4, 2, 1, 0],
      [3, 7, 5, 6],
      [7, 6, 4],
      [4, 7, 5],
      [4, 6, 5]
    ],
    g5 = [
      [1, 2, 3, 4],
      [2, 3, 0],
      [3, 0, 1],
      [0, 1, 2, 7],
      [0, 5, 6, 7],
      [6, 7, 4],
      [7, 4, 5],
      [3, 5, 4, 6]
    ];

  beforeEach(()=>{
    spyOn(Math, 'random').and.returnValue(0.0);
  });

  it('should work correctly', () => {
    expect(countMinCut(g1)).toBe(2);
    expect(countMinCut(g1)).toBe(2);
    expect(countMinCut(g1)).toBe(1);
    expect(countMinCut(g1)).toBe(1);
    expect(countMinCut(g1)).toBe(2);
  });
});
