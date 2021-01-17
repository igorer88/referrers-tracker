'use strict';
const seeder = require('mongoose-seed');
const cn = require('./database').cn;
const db = `mongodb://${cn.host}:${cn.port}/${cn.database}`;

seeder.connect(db, () => {
    seeder.loadModels([
        './db/models/user'
    ]);
    seeder.clearModels(['user'], () => {
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

const data = [{
    'model': 'user',
    'documents': [
        {
            '_id': '600353d679c7ab42d17e2d91',
            'username': 'admin',
            'password': '$2b$10$FD1rksY5YhB1fomqDyfyFev.gs04P595a4v40TFlu8lTovigj.fV.',
            'verified': true,
            'deleted': false
        }
    ]
    
}];