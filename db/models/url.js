'use strict';

const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    pathname: {
      type: String,
      unique: true,
      required: true
    },
    clicks: {
      type: Number,
      required: true,
      default: 0
    }
}, { timestamps: true });

urlSchema.methods.showInfo = () => {
  if (this.id){
    console.log(`
      id: ${this.id},
      url: ${this.url},
      clicks: ${this.clicks},
      createdAt: ${this.createdAt},
      updatedAt: ${this.updatedAt}
      `
    );
  }
}


module.exports = mongoose.model('url', urlSchema);
