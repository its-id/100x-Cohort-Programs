/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  // Time Complexity: O(N), Space Complexity: O(Total Categories) not considering the array returned
  let ans = [];

  let categories = new Map();

  //below code adds price value from the each transaction object to its respective category
  for (let i = 0; i < transactions.length; i++) {
    let prevValue = categories.get(transactions[i].category);
    if (prevValue)
      categories.set(
        transactions[i].category,
        prevValue + transactions[i].price
      );
    else categories.set(transactions[i].category, transactions[i].price);
  }

  //pushing the keys and values from map as object in format {category: [key], totalSpent: [value]} to our final ans[] array.
  categories.forEach((value, key) => {
    ans.push({
      category: key,
      totalSpent: value,
    });
  });

  return ans;
}

module.exports = calculateTotalSpentByCategory;
