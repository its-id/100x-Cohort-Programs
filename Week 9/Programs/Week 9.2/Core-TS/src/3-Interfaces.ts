// PROBLEM 1: Create an interface for a person object that contains a first name, last name, and age.
/*
interface User {
  firstName: string;
  lastName: string;
  age: number;
  email?: string; //optional property
}

function isLegal(user: User) {
  return user.age >= 18;
}

console.log(isLegal({ firstName: 'John', lastName: 'Doe', age: 17 }));
*/







// PROBLEM 2: Implementing interfaces in classes
/*
interface Person {
  name: string;
  age: number;
  greet(phrase: string): void; //giving a type to func inside interface. 
}

//classes can derive interfaces, but can't derive 'types'
class Employee implements Person {

  //by default, all properties are public
  name: string;
  age: number;

  // constructor: runs everytime a new instance of the class is created
  constructor(n: string, a: number) {
    //arguments passed should be assigned to the properties, else TS throws error
    this.name = n;
    this.age = a;
  }

  //method: call it on an instance of the class to console the phrase.
  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}
*/
