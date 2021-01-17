'use strict';

const userSchema = require('../db/models/user');
const moment = require('moment');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.passwordConfirm) {
            return res.status(409).send({ code: 409, status: 'Error', message: 'Username, password and password confirmation are required' });            
        }
        if (req.body.password !== req.body.passwordConfirm) {
            return res.status(409).send({ code: 409, status: 'Error', message: 'Password and password confirmation do not match' });  
        }
        const user = await userSchema.findOne({ username: req.body.username });
        if (user) {
            console.error(user);
            return res.status(409).send({ code: 409, status: 'Error', message: 'userSchema already registered' });  
        }
        const cryptedPassword = bcrypt.hashSync(req.body.password, 10);
        const username = req.body.username.toLowerCase();
        let newUser = await userSchema.create({ username, password: cryptedPassword })
        newUser.password = undefined;
        newUser.__v = undefined;
        return res.status(201).send({ code: 201, status: 'Success', message: `User ${newUser.username} has been registered successfully`, payload: newUser });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).send({ code: 409, status: 'Error', message: 'The username already exist' });
        }
        console.error(error);
        return res.status(500).send({ code: 500, status: 'Error', message: 'Something went wrong. Please try again.' });
    }
};

const login = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(409).send({ code: 409, status: 'Error', message: 'Username and password are required' });            
        }
        let user = await userSchema.findOne({ username: req.body.username.toLowerCase() });
        if (!user){
            res.status(404).send({ code: 404, status: 'Error', message: 'Username not found' });
        } else {
            const equals = bcrypt.compareSync(req.body.password, user.password);
            if (!equals) {
                res.status(409).send({ code: 409, status: 'Error', message: 'Username and/or password are incorrect' });
            } else {
                console.log(user.password)
                user.password = undefined;
                user.__v = undefined;
                res.json({
                    code: 200,
                    status: 'Success',
                    message: 'Access granted!',
                    payload: {
                        token: user.createToken(user._id),
                        expireAt: moment().add(1, 'day').utc().format('Y-MM-DD HH:MM:SS'),
                        user: user
                    }
                });
            }
        }   
    } catch (error) {
        console.error(error);
        return res.status(500).send({ code: 500, status: 'Error', message: 'Something went wrong. Please try again.' });
    }
}; 

module.exports = {
    signup,
    login
};
