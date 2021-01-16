'use strict';

const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    url: {
      type: String,
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
      verified: ${this.clicks},
      createdAt: ${this.createdAt},
      updatedAt: ${this.updatedAt}
      `
    );
  }
}

urlSchema.methods.savedStatus = () => {
  if (this.id){
    console.log(`
      The URL with the id: ${this.id} with the URL: ${this.url},
      has been saved at ${this.createdAt}.
    `);
  }
}

module.exports = mongoose.model('Url', urlSchema);
