const jwt = require('jsonwebtoken');

function userMiddleware(req, res, next) {
  // Implemented user auth logic
  // Checking the headers and validate the user from the admin DB.
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    req.username = decoded.username; // adding the admin to the request object
    next();
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = userMiddleware;
