/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  // Time Complexity: O(str.length)
  let count = 0;
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  for (let i = 0; i < str.length; i++) {
    const sToLower = str[i].toLowerCase();

    //checking if the current characters is a vowel
    for (let i = 0; i < 5; i++) {
      if (sToLower === vowels[i]) count += 1;
    }
  }

  return count;
}

module.exports = countVowels;
