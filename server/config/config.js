var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development:{
        db: 'mongodb://localhost/pacientes-crh',
        rootPath: rootPath,
        sessionSecret: 'developmentSessionSecret',
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://localhost/clinicarhuv',
        rootPath: rootPath,
        sessionSecret: 'developmentSessionSecret',
        port: process.env.PORT || 80
    }
}


