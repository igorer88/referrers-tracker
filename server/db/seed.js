'use strict';

const seeder = require('mongoose-seed');
const cn = require('../db/database').cn;
const db = `mongodb://${cn.host}:${cn.port}/${cn.database}`;

seeder.connect(db, () => {
  seeder.loadModels(['./models/user', './models/url']);
  seeder.clearModels(['user', 'url'], () => {
    seeder.populateModels(data, (err, done) => {
      if (err) {
        console.error(err);
      }
      if (done) {
        console.log(done);
      }
      seeder.disconnect();
    });
  });
});

const data = [
  {
    model: 'user',
    documents: [
      {
        _id: '600353d679c7ab42d17e2d91',
        username: 'admin',
        password:
          '$2b$10$FD1rksY5YhB1fomqDyfyFev.gs04P595a4v40TFlu8lTovigj.fV.',
        verified: true,
        deleted: false,
      },
    ],
  },
  {
    model: 'url',
    documents: [
      {
        _id: '6004a38312c9e5261f454223',
        href: 'http://test123.dev',
        hostname: 'test123.dev',
        protocol: 'http',
        clicks: 3,
      },
      {
        _id: '6004a2dd42edc624e2489867',
        href: 'http://local.dev',
        protocol: 'http',
        hostname: 'local.dev',
        port: null,
        clicks: 5,
      },
      {
        _id: '60051ee68148cc5b58f586f9',
        href: 'http://localhost.dev',
        protocol: 'http',
        hostname: 'localhost.dev',
        port: null,
        clicks: 8,
      },
      {
        _id: '6004b8bf3b0448398a7c6b35',
        href: 'http://asdfasdfasdf.asdf',
        protocol: 'http',
        hostname: 'asdfasdfasdf.asdf',
        port: null,
        clicks: 1,
      },
    ],
  },
];
