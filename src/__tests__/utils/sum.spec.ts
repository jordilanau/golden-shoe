import { sum } from '../../utils/sum';

describe('sum', () => {
  it('1+1 should return 2', () => {
    const a: number = 1;
    const b: number = 1;
    const expected: number = 2;
    expect(sum(a, b)).toBe(expected);
  });
});
