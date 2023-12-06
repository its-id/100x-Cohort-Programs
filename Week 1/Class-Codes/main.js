// 1. BASIC SYNTAX -
/*
console.log('hello world');
console.log(a);
*/




// 2. ARRAYS
/*
const personArray = ['harkirat', 'raman', 'indrakant'];
*/




// 3. WRITE A PROGRAM TO PRINT EVEN AGES
/*
const ages = [21, 22, 23, 24, 25];
for(let i = 0; i < ages.length; i++){
    if(ages[i]%2 == 0){
        console.log(ages[i]); //prints - 22, 24 
    }
}
*/




// 4. WRITE A PROGRAM TO PRINT MALE GENDER PEOPLE's NAMES
/*
const personArray = ['harkirat', 'raman', 'priya'];
const genderArray = ['male', 'male', 'female'];

for(let i = 0; i < personArray.length; i++){
    if(genderArray[i] === 'male'){
        console.log(personArray[i]); //prints - harkirat, raman
    }
}
*/



//above code can be converted to much cleaner code using objects.

// 5. OBJECTS
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
        console.log(allUsers[i].firstName); //prints - harkirat, raman
    }

}
*/




// 6. FUNCTION -
/*
function sum(a, b){
    const sumValue = a + b;
    return sumValue;
}

const value = sum(1, 2);
console.log(value); //prints 3
*/




// 7. FUNCTIONS TAKING ANOTHER FUNCTION as ARGUMENT
/*
function sum(num1, num2, fnToCall) {
    let result = num1 + num2;
    fnToCall(result);
}

function displayResult(data) {
    console.log("Result of the sum is : " + data);
}

function displayResultPassive(data) {
    console.log("Sum's result is : " + data);
}

// You are only allowed to call one function after this
// How will you displayResult of a sum
const ans = sum(1, 2, displayResult);
*/




// 8. FUNCTION CALLING BACK ANOTHER FUNCTION
/*
// Example 1:
function calculateArithmetic(a, b, arithmeticFinalFunction) {
    const ans = arithmeticFinalFunction(a, b); //this func is coming from the argument
    return ans;
}

function sum(a, b){
    return a + b;
}

const value = calculateArithmetic(1, 2, sum);
console.log(value);

//Example 2:
function greetAlien(){
    console.log('Hello Alien');
}

setTimeout(greetAlien, 3 * 1000);
*/








