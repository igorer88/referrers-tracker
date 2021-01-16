'use strict';

const userSchema = require('../db/models/user');
const moment = require('moment');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.confirm) {
            return res.status(409).send({ Code: 409, Status: 'Error', Message: 'Username, password and password confirmation are required' });            
        }
        if (req.body.password !== req.body.confirm) {
            return res.status(409).send({ Code: 409, Status: 'Error', Message: 'Password and password confirmation do not match' });  
        }
        const user = userSchema.findOne({ username: req.body.username });
        if (user) {
            return res.status(409).send({ Code: 409, Status: 'Error', Message: 'Password and password confirmation do not match' });  
        }
        let cryptedPassword = bcrypt.hashSync(req.body.password, 10);

    } catch (error) {
        console.error(error);
        return res.status(500).send({ Code: 500, Status: 'Error', Message: 'Something went wrong. Please try again.' });
    }
};

const login = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(409).send({ Code: 409, Status: 'Error', Message: 'Username and password are required' });            
        }
        const user = await userSchema.findOne({ username: req.body.username });
        console.log(user);
        if (!user){
            res.status(404).send({ Code: 404, Error: 'Username not found' });
        } else {
            const equals = bcrypt.compareSync(req.body.password, user.password);
            if (!equals) {
                res.status(409).send({ Code: 409, Status: 'Error', Message: 'Username and/or password are incorrect' });
            } else {
                console.log(user);
                res.json({
                    token: userSchema.createToken(user._id),
                    expire_at: moment().add(1, 'day').utc().format('Y-M-D H:M:S'),
                    user: user
                });
            }
        }   
    } catch (error) {
        console.error(error);
        return res.status(500).send({ Code: 500, Status: 'Error', Message: 'Something went wrong. Please try again.' });
    }
}; 

module.exports = {
    signup,
    login
};
