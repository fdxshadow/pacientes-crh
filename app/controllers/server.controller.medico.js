'use strict'

var Medico = require('mongoose').model('Medico');




exports.getMedicos = function (req, res) {
    Medico.find({}).exec(function (err, collection) {
        res.send(collection);
    })
};

