'use strict';

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const appName = process.env.APP_NAME;
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const cn = {
  host: host,
  port: port,
  database: dbName,
  user: dbUser,
  password: dbPassword,
  client_encoding: 'utf-8',
  application_name: appName,
};

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(
  `mongodb://${cn.host}:${cn.port}/${cn.database}`,
  mongooseOptions,
  (error) => {
    return error;
  }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, '✖ MongoDB connection error:'));
db.once('open', () => {
  // we're connected!
  console.log(`✔ MongoDB Server listening on: http://${cn.host}:${cn.port}`);
});

module.exports = {
  cn,
  db,
};
