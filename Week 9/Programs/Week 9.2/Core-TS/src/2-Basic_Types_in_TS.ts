
//PROBLEM 1: Here, argument needs to have a type.
/*
function greet(firstName: string) {
  console.log('Hello ' + firstName);
}

greet('Harkirat');
*/





//PROBLEM 2: Assigning Return TYPE to func.
// 1. Here, we can also explicitly give the type of the returned value
// 2. Even, if we don't give it explicitly, it will be inferred by the compiler (known as Type Inference)
/*
function sum(a: number, b: number): number {
  return a + b;
}

const value = sum(1, 2);
console.log(value);
*/






//PROBLEM 3: Type Inference
/*
function isLegal(age: number) {
    return age >= 18;
}

console.log(isLegal(2));
*/








// PROBLEM 4: Giving type to a function.
/*
function runAfter1S(fn: () => void){
    setTimeout(fn, 1000);
}

runAfter1S(function(){
    console.log("Hello called after 1s");
})
*/