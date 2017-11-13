'use strict'

// rehacer
var Examen = require('mongoose').model('Examen');

exports.getExamenes = function (req, res) {
    Examen.find({}).exec(function (err, collection) {
        if(err){
            console.log(res);
            res.send("error getExamenes");
        }
        else{
            console.log(collection);
            return res.send(collection);
    }
    })
};

var ObjectId = require('mongoose').Types.ObjectId;


exports.create = function (req, res, next){
    var examenData = req.body;
    console.log(req.body.nombre);

    Examen.find({"nombre": req.body.nombre}).exec(function(err, collection) {
        if(collection.length > 0) {
            err = new Error('Examen ya existe');
            res.status(400);
            return res.send({reason:err.toString()})
        }
        else {
            Examen.create(examenData, function(err, examen){

                res.send(examen);
            })
        }
    })



};
