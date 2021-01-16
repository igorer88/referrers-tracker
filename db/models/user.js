'use strict';

const moment = require('moment');
const jwt = require('jwt-simple');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
      type: String,
      require: true
    },
    verified: {
      type: Boolean,
      required: true,
      default: false
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false
    }
}, { timestamps: true });

userSchema.methods.showInfo = () => {
  if (this._id){
    console.log(`
      id: ${this._id},
      username: ${this.username},
      password: ${this.password},
      verified: ${this.verified},
      deleted: ${this.deleted},
      createdAt: ${this.createdAt},
      updatedAt: ${this.updatedAt}
      `
    );
  }
}

userSchema.methods.savedStatus = () => {
  if (this.id){
    console.log(`
      The User with the id: ${this._id}, has been saved at ${this.createdAt}.
    `);
  }
}

userSchema.methods.createToken = (userId) => {
  const payload = {
    userId: userId,
    createAt: moment().unix(),
    expireAt: moment().add(1, 'day').unix()
  };
  return jwt.encode(payload, process.env.TOKEN_KEY);
}

module.exports = mongoose.model('user', userSchema);
