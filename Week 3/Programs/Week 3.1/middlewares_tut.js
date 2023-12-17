//PURPOSE: This file is used to learn about middlewares in express.js
const express = require('express');
const zod = require('zod'); //INPUT VALIDATION LIBRARY, usage at line no. 6, 71
const app = express();

const schema = zod.array(zod.number());

// MIDDLEWARE TO KEEP TRACK OF NUMBER OF REQUESTS MADE TO THE SERVER
let numberOfRequests = 0;
app.use(express.json()); //middleware to parse the body of the request 

function calculateRequests(req, res, next) {
  numberOfRequests++;
  console.log('Number of requests made: ', numberOfRequests);
  next();
}

//MIDDLEWARE TO CALCULATE THE TIME TAKEN TO HANDLE EACH REQUEST
function averageTime(req, res, next) {
  const start = Date.now();
  res.on('finish', function () {
    const end = Date.now();
    console.log('Time taken to handle request: ', (end - start) / 1000, 'secs');
  });
  next();
}

app.get('/health-checkup', calculateRequests, averageTime, function (req, res) {
  const username = req.headers.username;
  const password = req.headers.password;
  const kidneyId = req.query.kidneyId;

  //shift the below two IFs code to middleware
  if (!username == 'inder' || !password == 'pass') {
    res.status(400).json({ msg: 'Something wrong with your inputs!' });
    return;
  }

  if (kidneyId == 1 || kidneyId == 2) {
    res.json({
      msg: 'Your kidney is fine!',
    });
    return;
  }

  res.status(400).json({ msg: 'Your kidney is not fine!' });
});
//send a GET request to http://localhost:3000/health-checkup
//with headers: username: inder, password: pass and query: kidneyId: 1

/*
// HOW TO USE MULTIPLE MIDDLEWARES
app.get('/health-checkup-2', function (req, res, next) {
  console.log('hi from req1');
  next();
}, function(req, res) {
  console.log('hi from req2');
});
*/

//GLOBAL CATCHES: HANDLES AND CUSTOMIZES ALL ERRORS/EXCEPTIONS IN THE SERVER
app.use(function (err, req, res, next) {
  res.json({
    msg: 'Sorry something is up with our server',
  });
});




//INPUT VALIDATION USING ZOD #1
app.post('/health-checkup-2', function (req, res) {
  // kidneys = [1, 2]
  const kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys);

  if (!response.success) {
    res.status(400).json({ msg: 'Something wrong with your inputs!' });
    return;
  }

  res.send({
    response,
  });
});
//send a POST request to http://localhost:3000/health-checkup-2
//with body: kidneys: [1, 2] or kidneys: [1, 2, '3']


//ZOD VALIDATION EXAMPLE #2
function validateInputs(obj) {
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(10).max(100),
  });
  const response = schema.safeParse(obj);
  return response;
}

app.post('/login', function (req, res) {
  const response = validateInputs(req.body);
  if (!response.success) {
    res.status(400).json({ msg: 'Something wrong with your inputs!' });
    return;
  }

  res.send({
    response,
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});