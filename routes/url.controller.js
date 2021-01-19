'use strict';

const URL = require('url').URL;
const validUrl = require('valid-url');
const urlSchema = require('../db/models/url');

const createUrl = async (req, res) => {
  try {
    if (!validUrl.isUri(req.body.url)) {
      return res.status(409).send({
        code: 409,
        status: 'Error',
        message: 'Url validation error.',
      });
    }
    const link = new URL(req.body.url);
    let result = await urlSchema.create({
      href: link.href,
      protocol: link.protocol,
      hostname: link.hostname,
      port: link.port,
    });
    result.__v = undefined;
    return res.status(201).send({
      code: 201,
      status: 'Success',
      message: `The Url ${result.href} has been saved successfuly`,
      payload: result,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(409).send({
        code: 409,
        status: 'Error',
        message: 'The url already exist.',
      });
    }
    console.error(error);
    return res.status(500).send({
      code: 500,
      status: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  }
};

const updateClicks = async (req, res) => {
  try {
    const url = await urlSchema.findOne({ href: req.body.url });
    if (!url) {
      return res
        .status(404)
        .send({ code: 404, status: 'Error', message: 'Url not found' });
    }
    url.clicks += 1;
    let updated = await urlSchema.findOneAndUpdate(
      { href: url.href },
      { clicks: url.clicks }
    );
    updated.__v = undefined;
    return res.status(200).send({
      code: 200,
      status: 'Success',
      message: 'Url sucessfully updated',
      payload: updated,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      status: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  }
};

const topHighiestClicks = async (req, res) => {
  try {
    const tops = await urlSchema.find({}).sort({ clicks: -1 }).limit(3);
    return tops.length === 0
      ? res.status(404).send({
          code: 404,
          message: 'No urls have been found',
          payload: tops,
        })
      : res.status(200).send({
          code: 200,
          message: `${tops.length} urls have been found`,
          payload: tops,
        });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      code: 500,
      status: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  }
};

module.exports = {
  createUrl,
  updateClicks,
  topHighiestClicks,
};
