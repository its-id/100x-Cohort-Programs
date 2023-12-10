/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('promise resolved after ' + n + ' seconds');   
        }, n*1000);
    })
}

const p = wait(1);
p.then(function(data){
    console.log(data);
    console.log('inside .then() function after promise is resolved');
})

