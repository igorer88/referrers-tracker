'use strict';

const Url = require('parse-url');
const urlSchema = require('../db/models/url');

const createUrl = async (req, res) => {
  try {
    // eslint-disable-next-line no-extra-boolean-cast
    // if (services.validateUrl(req.body.url))
      //  return res.status(400).send({ code: 400, Message: 'Invalid URL.' });
      const link = new Url(req.body.url);      
      await urlSchema.create({ pathname: link.href });
      return res.status(201).send({ Code: 201, Status: 'Success', Message: link });
  } catch (error) {
      if (error.code === 11000) {
        return res.status(409).send({ Code: 409, Status: 'Error', Message: 'The url already exist.' });
      }
      console.error(error);
      return res.status(500).send({ Code: 500, Status: 'Error', Message: 'Something went wrong. Please try again.' });
  }
};

const updateClicks = async (req, res) => {
  try {
      const url = await urlSchema.findOne({ pathname: req.body.url });
      if (!url) {
        return res.status(404).send({ Code: 404, Status: 'Error', Message: 'Not found'});
      }
      url.clicks += 1;
      let updated = await urlSchema.findOneAndUpdate({pathname: url.pathname}, {clicks: url.clicks});
      return res.status(200).send({ Code: 200, Status: 'Success', Message: updated });

  } catch (error) {
      return res.status(500).send({ Code: 500, Status: 'Error', Message: 'Something went wrong. Please try again.' });
  }
};

const topHighiestClicks = async (req, res) => {
  try {
    const tops = await urlSchema.find({}).sort({ clicks: -1 }).limit(3);
    
    return !tops ? res.status(200).send({ Code: 200, Message: 0 }) : res.status(200).send({ Code: 200, Message: tops });
  } catch (error) {
      return res.status(500).send({ Code: 500, Status: 'Error', Message: 'Something went wrong. Please try again.' });
  }
};

module.exports = {
  createUrl,
  updateClicks,
  topHighiestClicks
};