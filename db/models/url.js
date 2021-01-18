'use strict';

const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema(
  {
    href: {
      type: String,
      unique: true,
      required: true,
    },
    protocol: {
      type: String,
    },
    port: {
      type: Number,
    },
    hostname: {
      type: String,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

urlSchema.methods.showInfo = () => {
  if (this.id) {
    console.log(`
      id: ${this.id},
      url: ${this.url},
      clicks: ${this.clicks},
      createdAt: ${this.createdAt},
      updatedAt: ${this.updatedAt}
      `);
  }
};

module.exports = mongoose.model('url', urlSchema);
