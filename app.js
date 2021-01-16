'use strict';

const express = require ('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./db/database');
const routes = require('./routes/api');

require('dotenv').config();

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};

// Remove x-powered-by header (doesn't let clients know we are using Express)
app.disable('x-powered-by');
// Support Cross-Browsing requests
app.use(cors(corsOptions));
// Support parsing of application/json type post data
app.use(bodyParser.json());
// Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// Returns the middleware that parses http requests log.
app.use(morgan('dev'));

app.use(routes);

/* error handlers */
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
        message: err.message
    });
});

app.listen(port, () => {
  try {
    console.log(`✔ Server listening on: http://localhost:${port}`);
    // eslint-disable-next-line no-undef
    database.db;                                       // Initialize the DB connection for testing
   } catch (e) {
    console.error('✖ There has been an error with the MongoDB server.');
  }
});
