const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); //not needed
const jwtPassword = '123456';

dotenv.config(); //not needed

mongoose.connect(process.env.DB_URL); //replace with your mongodb url
//will convert to: mongoose.connect(mongodb+srv://<username>:<passowrd>@<cluster_name>.mongodb.net/<model_name>)

//creates or uses the schema for the collection with following object structure
const User = mongoose.model('users', {
  name: String,
  username: String,
  pasword: String,
});

const app = express();
app.use(express.json());

// FUNCTION TO CHECK IF USER EXISTS IN DB
async function userExists(username) {
  return await User.findOne({
    username: username,
  });
}

app.post('/signup', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  if (!username || !password || !name) {
    return res.status(403).json({
      msg: 'Please enter all the fields',
    });
  }

  // check if user exists in the database. User is a mongoose model. findOne is a mongoose function to find a document in the collection based on the query
  if (await userExists(username)) {
    //should check for password too, for which it will not work as password not hashed.
    return res.status(403).json({
      msg: 'User already exists',
    });
  }

  const user = new User({
    name: name,
    username: username,
    password: password, //should be hashed, mongodb will not store it in plain text
  });

  await user.save();

  return res.json({
    msg: 'User created successfully',
  });
});


app.post('/signin', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(403).json({
      msg: 'Please enter all the fields',
    });
  }

  if (!(await userExists(username))) {
    return res.status(403).json({
      msg: 'User doesnt exist in our in memory db',
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    msg: 'User signed in successfully',
    token,
  });
});


//pass the auth token which you get from signin in the header for this request
app.get('/users', async function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username from the database
    const users = await User.find({ username: { $ne: username } });
    return res.json({
      msg: 'Users fetched successfully',
      username: username,
      other_users: users,
    });
  } catch (err) {
    return res.status(403).json({
      msg: 'Invalid token',
    });
  }
});


app.listen(3000, function () {
  console.log('Server started on port 3000');
});
