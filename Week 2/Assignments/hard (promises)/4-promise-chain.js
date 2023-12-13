/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function waitOneSecond() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('waited one second');
    }, 1000);
  });
}

function waitTwoSecond() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('waited two seconds');
    }, 2000);
  });
}

function waitThreeSecond() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('waited three seconds');
    }, 3000);
  });
}

function calculateTime() {
  const start = Date.now();

  waitOneSecond()
    .then((value) => {
      console.log(value);
      return waitTwoSecond();
    })
    .then((value) => {
      console.log(value);
      return waitThreeSecond();
    })
    .then((value) => {
      console.log(value);
      console.log(`It took ${(Date.now() - start) / 1000} seconds`);
    });
}

calculateTime();
