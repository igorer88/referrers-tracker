'use strict';

const Url = require('parse-url');
const urlSchema = require('../db/models/url');

const createUrl = async (req, res) => {
  try {
    // eslint-disable-next-line no-extra-boolean-cast
    // if (services.validateUrl(req.body.url))
    //  return res.status(400).send({ code: 400, message: 'Invalid URL.' });
    const link = new Url(req.body.url);
    await urlSchema.create({ pathname: link.href });
    return res
      .status(201)
      .send({ code: 201, status: 'Success', message: link });
  } catch (error) {
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
    const url = await urlSchema.findOne({ pathname: req.body.url });
    if (!url) {
      return res
        .status(404)
        .send({ code: 404, status: 'Error', message: 'Url not found' });
    }
    url.clicks += 1;
    let updated = await urlSchema.findOneAndUpdate(
      { pathname: url.pathname },
      { clicks: url.clicks }
    );
    updated.__v = undefined;
    return res
      .status(200)
      .send({ code: 200, status: 'Success', message: updated });
  } catch (error) {
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
    console.log(tops);
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
