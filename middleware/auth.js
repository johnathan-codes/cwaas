const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized access' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: 'Invalid token' });
  }
}

module.exports = auth;
