// Invocar al modo JavaScript 'strict'
'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ExamenSchema = new Schema({
nombre:{
	type: String
},
horario:{
	type: String
},
personal:{
	type: String
}
});

var Examen = mongoose.model('Examen', ExamenSchema);

function createDefaultExamenes(){
	//cargar los exámenes 
	Examen.find({}).exec(function(err,collection){ 
	if(collection.length === 0){
		
		Examen.create({nombre:"Ecografía", horario:"8:00-10:00 hrs", personal:"médico"});
		Examen.create({nombre:"Insiminación intrauterina", horario:"8:00-14:00 hrs", personal:"enfermero/tec.médico"});
		Examen.create({nombre:"Fecundación in vitro", horario:"8:00-14:00 hrs", personal:"enfermero/tec.médico"});
		Examen.create({nombre:"Espermiograma", horario:"8:00-14:00 hrs", personal:"enfermero/tec.médico"});
		Examen.create({nombre:"Fragmentación del DNA", horario:"8:00-14:00 hrs", personal:"enfermero/tec.médico"});
		Examen.create({nombre:"Criopreservación de ovocitos", horario:"8:00-14:00 hrs", personal:"enfermero/tec.médico"});
		Examen.create({nombre:"Criopreservación espermática", "horario":"8:00-14:00 hrs", personal:"enfermero/tec.médico"});
		Examen.create({nombre:"Ovodonación", horario:"8:00-14:00 hrs", personal:"enfermero/tec.médico"});
		Examen.create({nombre:"Donación de semen", horario:"8:00-14:00 hrs", personal:"enfermero/tec.médico"});
		
	}
})

};
exports.createDefaultExamenes = createDefaultExamenes;
