const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate JWT and optionally authorize based on roles
 * @param {Array} allowedRoles - Array of allowed roles. If empty, allows all authenticated users.
 */
const authenticateToken = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden

      req.user = user;

      // If allowedRoles is empty, allow all authenticated users
      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }

      next();
    });
  };
};

module.exports = authenticateToken;
