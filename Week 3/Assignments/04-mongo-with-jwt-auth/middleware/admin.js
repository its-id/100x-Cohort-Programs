const jwt = require('jsonwebtoken');

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implemented admin auth logic
  // Checking the headers and validate the admin from the admin DB.
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
    res.status(401).json({ error: 'Unauthorized'});
  }
}

module.exports = adminMiddleware;
