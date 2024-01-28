// EXAMPLE 1: GIVING TYPE TO AN ARRAY
/*
// Problem: Given an array of positive integers as input, return the maximum value in the array
function getMax(arr: number[]) {
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (max < arr[i])
            max = arr[i];
    }
    return max;
}

console.log(getMax([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
*/






//EXAMPLE 2: GIVING TYPE TO AN ARRAY OF OBJECTS 
// Problem: Given a list of users, filter out the users that are legal (greater than 18 years of age)
interface User {
  firstName: string;
  lastName: string;
  age: number;
}

function filteredUsers(users: User[]) {
  return users.filter((x) => x.age >= 18);
}

console.log(
  filteredUsers([
    {
      firstName: 'harkirat',
      lastName: 'Singh',
      age: 21,
    },
    {
      firstName: 'Raman',
      lastName: 'Singh',
      age: 16,
    },
  ])
);