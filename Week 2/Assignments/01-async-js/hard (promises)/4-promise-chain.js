/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
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

  const difference = await waitOneSecond(first)
    .then(() => {
      return waitTwoSecond(second);
    })
    .then(() => {
      return waitThreeSecond(third);
    })
    .then(() => {
      const end = Date.now();
      return end - start;
    });

  return difference;
}

module.exports = calculateTime;
