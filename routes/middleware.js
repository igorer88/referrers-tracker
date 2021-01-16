'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {
    if (!req.header('access-token')){
        return res.status(406).json({
            code: 406,
            status: 'Error',
            message: 'You must include the access-token header'
        });
    }
    const token = req.header('access-token');
    let payload = null;
    try {
        payload = jwt.decode(token, process.env.TOKEN_KEY);
    } catch (error) {
        return res.status(401).json({
            code: 401,
            status: 'Error',
            message: 'Invalid token'
        });
    }
    if(moment().unix() > payload.expire_at){
        return res.status(401).json({
            code: 401,
            status: 'Error',
            message: 'Expired token'
        });
    }
    req.userId = payload.userId;
    next();
}

module.exports = {
    checkToken
};
