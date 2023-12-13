// Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

let counter = 0;

for(let i = 0; i < 10; i++){
    setTimeout(function(){
        counter += 1;
        console.log('counter: ', counter);
    }, i*1000);
}







































































// (Hint: setTimeout)