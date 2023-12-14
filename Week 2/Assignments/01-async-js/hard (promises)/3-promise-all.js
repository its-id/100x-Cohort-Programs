/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */

function waitOneSecond(first) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, first * 1000);
  });
}

function waitTwoSecond(second) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, second * 1000);
  });
}

function waitThreeSecond(third) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, third * 1000);
  });
}

async function calculateTime(first, second, third) {
  
  const start = Date.now();

  const difference = await Promise.all([ waitOneSecond(first), waitTwoSecond(second), waitThreeSecond(third) ]).then((values) => {
    const end = Date.now();
    return end - start;
  });

  return difference;
}

module.exports = calculateTime;
