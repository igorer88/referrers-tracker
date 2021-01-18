'use strict';

const userSchema = require('../db/models/user');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const signup = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.passwordConfirm) {
      return res.status(409).send({
        code: 409,
        status: 'Error',
        message: 'Username, password and password confirmation are required',
      });
    }
    if (req.body.password !== req.body.passwordConfirm) {
      return res.status(409).send({
        code: 409,
        status: 'Error',
        message: 'Password and password confirmation do not match',
      });
    }
    const user = await userSchema.findOne({ username: req.body.username });
    if (user) {
      console.error(user);
      return res.status(409).send({
        code: 409,
        status: 'Error',
        message: `Username ${req.body.username} already registered`,
      });
    }
    const cryptedPassword = bcrypt.hashSync(req.body.password, 10);
    const username = req.body.username.toLowerCase();
    let newUser = await userSchema.create({
      username,
      password: cryptedPassword,
    });
    newUser.password = undefined;
    newUser.__v = undefined;
    return res.status(201).send({
      code: 201,
      status: 'Success',
      message: `User ${newUser.username} has been registered successfully`,
      payload: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send({
        code: 409,
        status: 'Error',
        message: 'The username already exist',
      });
    }
    console.error(error);
    return res.status(500).send({
      code: 500,
      status: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(409).send({
        code: 409,
        status: 'Error',
        message: 'Username and password are required',
      });
    }
    let user = await userSchema.findOne({
      username: req.body.username.toLowerCase(),
    });
    if (!user) {
      res
        .status(404)
        .send({ code: 404, status: 'Error', message: 'Username not found' });
    } else {
      const equals = bcrypt.compareSync(req.body.password, user.password);
      if (!equals) {
        res.status(409).send({
          code: 409,
          status: 'Error',
          message: 'Username and/or password are incorrect',
        });
      } else {
        console.log(user.password);
        user.password = undefined;
        user.__v = undefined;
        res.json({
          code: 200,
          status: 'Success',
          message: 'Access granted!',
          payload: {
            token: user.createToken(user._id),
            expireAt: moment().add(1, 'day').utc().format('Y-MM-DD HH:MM:SS'),
            user: user,
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      status: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  }
};

const checkToken = async (req, res) => {
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
  res.json({
    code: 200,
    status: 'Success',
    message: 'Valid token',
  });
};

module.exports = {
  signup,
  login,
  checkToken,
};
