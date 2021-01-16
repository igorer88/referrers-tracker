'use strict';

const express = require('express');
const router = express.Router();
const urlController = require('./url.controller');
const authController = require('./auth.controller');

/* GET API Root. */
router.get('/api', async (req, res) => {
  res.status(200).send({
    code: 200,
    message: 'Api Root'
  });
});

/* POST signup. */
router.post('/api/auth/signup', authController.signup);
/* POST login. */
router.post('/api/auth/login', authController.login);

/* POST URL. */
router.post('/api/urls', urlController.createUrl);
/* UPDATE clicks on URL. */
router.put('/api/urls', urlController.updateClicks);
/* GET top 3 highest clicks on URLs. */
router.get('/api/urls/tops', urlController.topHighiestClicks);

module.exports = router;
