// Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 
let fs = require('fs');
fs.readFile('a.txt', 'utf-8', function(err, data) {
    console.log('data from fs: ', data);
})

let a = 0;
for(let i = 0; i < 1000000000; i++){
    a += 1;
}

//why is the for loop code always running first, answer below
// The reason is that the fs.readFile is an async function.
// This means that it will not block the execution of the rest of the code.

console.log('a: ', a);