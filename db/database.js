'use strict';

const mongoose = require('mongoose');

const cn = {
    host: 'localhost',
    port: '27018',
    database: 'referrers-tracker',
    user: 'root',
    password:  '1234',
    client_encoding: 'utf-8',
    application_name: 'Referrers Tracker'
};

const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(`mongodb://${cn.host}:${cn.port}/${cn.database}`, mongooseOptions, error => {
    return error;
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, '✖ MongoDB connection error:'));
db.once('open', () => {
  // we're connected!
    console.log(`✔ MongoDB Server listening on: http://${cn.host}:${cn.port}`);
});

module.exports = {
    db
};
