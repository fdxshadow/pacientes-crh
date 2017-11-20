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

exports.getExamenById = function (req, res) {
    Examen.findOne({"_id":ObjectId(req.params.id)}).exec(function (err, examen) {
        return res.send(examen);
    })
};

exports.update = function(req, res){
    var examenData = req.body;

    Examen.update({"_id":examenData._id}, examenData,  function(err){
        if(err){
            res.status(400);
            return res.send({reason:err.toString()})
        }
        res.status(204);
        res.end()
    })

};

