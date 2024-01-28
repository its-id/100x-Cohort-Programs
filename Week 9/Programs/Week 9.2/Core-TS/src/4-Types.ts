// TYPE: SYNTAX
/*
type User = {
	firstName: string;
	lastName: string;
	age: number
}
*/





// Basic differences b/w interfaces and types are:
// 1. Interfaces can be used to extend other INTERFACES (uses 'extends') and CLASSES (uses 'implements'), but types can't.
// 3. Types lets you do below things 👇



// FEATURE 1: UNIONS
/*
type GreetArg = number | string; //type can be either number or string.
function greet(id: GreetArg) {
    console.log(`Hello ${id}`);
}

greet(1);
greet("1");
*/






// FEATURE 2: INTERSECTION
/*
type Employee = {
  name: string;
  startDate: Date;
};

type Manager = {
  name: string;
  department: string;
};

type TechLead = Employee & Manager; //Techlead type contains all properties of Employee and Manager types

//teamLead is able to use Employee and Manager properties using TechLead type
const teamLead: TechLead = {
  name: 'harkirat',
  startDate: new Date(),
  department: 'Software developer',
};

console.log(teamLead);
*/




