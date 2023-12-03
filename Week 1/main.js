// basic syntax
/*
console.log('hello world');
console.log(a);
*/

// if else
/*
let firstName = 'indrakant';
let age = 23;
let isMarried = true;

if (isMarried) console.log(firstName + 'is married');
if (!isMarried) console.log(firstName + 'is not married');
*/

// loops
/*
let answer = 0;
for (let i = 1; i <= 10; i++) {
  console.log(i);
  answer += i;
}
console.log('sum: ' + answer);
*/


// arrays
/*
const personArray = ['harkirat', 'raman', 'indrakant'];
*/

//write a program to print even ages
/*
const ages = [21, 22, 23, 24, 25];
for(let i = 0; i < ages.length; i++){
    if(ages[i]%2 == 0){
        console.log(ages[i]);
    }
}
*/


//write a program to print male gender people's names.
/*
const personArray = ['harkirat', 'raman', 'priya'];
const genderArray = ['male', 'male', 'female'];

for(let i = 0; i < personArray.length; i++){
    if(genderArray[i] === 'male'){
        console.log(personArray[i]);
    }
}
*/

//same code can be converted to much cleaner code using objects.

//objects
/*
const allUsers = [
    {
        firstName: 'harkirat',
        gender: 'male'
    },
    {
        firstName: 'raman',
        gender: 'male'
    },
    {
        firstName: 'priya',
        gender: 'female'
    }
]

for(let i = 0; i < allUsers.length; i++){

    if(allUsers[i].gender === 'male'){
        console.log(allUsers[i].firstName);
    }

}
*/




