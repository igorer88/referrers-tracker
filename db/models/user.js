'use strict';

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
    }
}, { timestamps: true });

urlSchema.methods.showInfo = () => {
  if (this.id){
    console.log(`
      id: ${this.id},
      username: ${this.username},
      password: ${this.password},
      verified: ${this.verified},
      createdAt: ${this.createdAt},
      updatedAt: ${this.updatedAt}
      `
    );
  }
}

urlSchema.methods.savedStatus = () => {
  if (this.id){
    console.log(`
      The User with the id: ${this.id} with the short URL: ${this.shortURL},
      has been saved at ${this.createdAt}.
    `);
  }
}

module.exports = mongoose.model('User', userSchema);
