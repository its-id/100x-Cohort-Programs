/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
  // Time Complexity: O(N), Space Complexity: O(1)
  if (!numbers.length) return undefined;

  let largest = -999999;
  for (let i = 0; i < numbers.length; i++)
    largest = numbers[i] > largest ? numbers[i] : largest;
  return largest;
}

module.exports = findLargestElement;
