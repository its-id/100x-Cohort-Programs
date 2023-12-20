const { User } = require('../db/index');
const bcrypt = require('bcrypt');

async function userMiddleware(req, res, next) {
  // Implemented user auth logic
  // Checking the headers and validating the user from the user DB.
  try {
    const { username, password } = req.headers;

    //checking if username exists
    const user = await User.findOne({ username });

    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    else {
      //checking if password is correct
      const passwordValidates = bcrypt.compare(password, user.password);

      if (passwordValidates) next();
      else return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (e) {
    res.status(401).send();
  }
}

module.exports = userMiddleware;
