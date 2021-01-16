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
        const user = await userSchema.findOne({ username: req.body.username });
        if (user) {
            console.error(user);
            return res.status(409).send({ Code: 409, Status: 'Error', Message: 'userSchema already registered' });  
        }
        const cryptedPassword = bcrypt.hashSync(req.body.password, 10);
        const username = req.body.username.toLowerCase();
        let newUser = await userSchema.create({ username, password: cryptedPassword })
        newUser.password = undefined;
        newUser.__v = undefined;
        return res.status(201).send({ Code: 201, Status: 'Success', Message: newUser });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).send({ Code: 409, Status: 'Error', Message: 'The username already exist' });
        }
        console.error(error);
        return res.status(500).send({ Code: 500, Status: 'Error', Message: 'Something went wrong. Please try again.' });
    }
};

const login = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(409).send({ Code: 409, Status: 'Error', Message: 'Username and password are required' });            
        }
        let user = await userSchema.findOne({ username: req.body.username.toLowerCase() });
        if (!user){
            res.status(404).send({ Code: 404, Error: 'Username not found' });
        } else {
            const equals = bcrypt.compareSync(req.body.password, user.password);
            if (!equals) {
                res.status(409).send({ Code: 409, Status: 'Error', Message: 'Username and/or password are incorrect' });
            } else {
                user.password = undefined;
                user.__v = undefined;
                res.json({
                    token: user.createToken(user._id),
                    expireAt: moment().add(1, 'day').utc().format('Y-MM-DD HH:MM:SS'),
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
