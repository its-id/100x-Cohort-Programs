import { describe, expect, it } from '@jest/globals';
import { sum, multiply } from '../index';

//describe function is used to group the test cases.
//For eg: sum function test cases are grouped under describe('sum', () => {})
describe('sum module', () => {
  it('add 1 + 2 equals to 3', () => {
    expect(sum(1, 2)).toBe(3); //expect function is used to test the output of the function
  });

  it('should return the sum of negative numbers correctly', () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});

describe('multiply module', () => {
  it('should work correctly on basic multiplication', () => {
    expect(multiply(2, 3)).toBe(6);
  });
});
