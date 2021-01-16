'use strict';

const moment = require('moment');
const jwt = require('jwt-simple');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
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
  if (this.id){
    console.log(`
      id: ${this.id},
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
      The User with the id: ${this.id} with the short URL: ${this.shortURL},
      has been saved at ${this.createdAt}.
    `);
  }
}

userSchema.methods.createToken = (user_id) => {
  const payload = {
    user_id: user_id,
    create_at: moment().unix(),
    expire_at: moment().add(1, 'day').unix()
  };
  return jwt.encode(payload, process.env.TOKEN_KEY);
}

module.exports = mongoose.model('User', userSchema);
