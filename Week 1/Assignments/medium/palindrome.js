/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  // Time Complexity: O(str.length / 2)

  //removing all the extra spaces and converting to case-insensitive format
  let convertedStr = '';
  for (let i = 0; i < str.length; i++) {
    const strToLower = str[i].toLowerCase();
    if (strToLower !== ' ' && strToLower >= 'a' && strToLower <= 'z') {
      convertedStr += strToLower;
    }
  }

  let start = 0,
    end = convertedStr.length - 1;

  //maing logic of checking if the string is palindrome or not.
  while (start < end) {
    if (convertedStr[start] != convertedStr[end]) return false;
    start++;
    end--;
  }

  return true;
}

module.exports = isPalindrome;
