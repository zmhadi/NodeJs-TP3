const { sign } = require('jsonwebtoken');

exports.generateAuthToken = (userId, firstName, roles) => {
  return sign(
    { userId, firstName, roles },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );
};
