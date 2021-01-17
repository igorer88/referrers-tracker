'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(406).json({
      code: 406,
      status: 'Error',
      message: 'You must include the Authorization header',
    });
  }
  const header = req.header('Authorization');
  const token = header.split(' ');
  if (token[0] !== 'Bearer') {
    return res.status(401).json({
      code: 401,
      status: 'Error',
      message: 'Invalid token format',
    });
  }
  let payload = null;

  try {
    payload = jwt.decode(token[1], process.env.TOKEN_KEY);
  } catch (error) {
    return res.status(401).json({
      code: 401,
      status: 'Error',
      message: 'Invalid token',
    });
  }
  if (moment().unix() > payload.expireAt) {
    return res.status(401).json({
      code: 401,
      status: 'Error',
      message: 'Expired token',
    });
  }
  req.userId = payload.userId;
  next();
};

module.exports = {
  checkToken,
};
