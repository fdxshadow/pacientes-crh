'use strict'

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

exports.create = function (req, res, next){
    var ExamenData = req.body;
    console.log(req.body.nombre);

    /*Examen.create(ExamenData, function(err, examen){
        if(err){
        	if(err.toString().indexOf('E11000') > -1){
                err = new Error('Examen ya existe');
            }
            res.status(400);
            return res.send({reason:err.toString()})
            }*/
         res.send(examen);
    //   });
};



/*
function createDefaultExamenes(){
    Examen.find({}).exec(function(err, collection) {

        if(collection.length === 0) {
            Paciente.create({rut:'1-9',firstName: 'john', lastName: 'doe', telephone:"+56 9 841 000 000"});
            Paciente.create({rut:'15095162-3',firstName: 'claudio', lastName: 'araya', telephone:"+56 9 841 0322 000"});
            Paciente.create({rut:'15751100-9',firstName: 'katherine', lastName: 'loayza', telephone:"+56 9 841 000 000"});
        }
    })
}
*/


/*
exports.create = function(req, res) {
	// Crear un nuevo objeto paciente
	var examen = new Examen(req.body);

	// Intentar salvar el paciente
	examen.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del paciente
			res.json(examen);
		}
	});
};

*/