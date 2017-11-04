// Invocar al modo JavaScript 'strict'
'use strict';
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ExamenSchema = new Schema({
nombre:{
	type: String
},
horario:{
	hora_inicio:String,
	hora_termino:String
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
		
		Examen.create({nombre:"Ecografía", horario:{hora_inicio:"8:00",hora_termino:"10:00"}, personal:"médico"});
		Examen.create({nombre:"Insiminación intrauterina", horario:{hora_inicio:"8:00",hora_termino:"14:00"}, personal:"enfermero/tec.médico"});
		Examen.create({nombre:"Fecundación in vitro",horario:{hora_inicio:"8:00",hora_termino:"14:00"}, personal:"enfermero/tec.médico"});
		Examen.create({nombre:"Espermiograma",horario:{hora_inicio:"8:00",hora_termino:"14:00"}, personal:"enfermero/tec.médico"});
		Examen.create({nombre:"Fragmentación del DNA",horario:{hora_inicio:"8:00",hora_termino:"14:00"}, personal:"enfermero/tec.médico"});
		Examen.create({nombre:"Criopreservación de ovocitos",horario:{hora_inicio:"8:00",hora_termino:"14:00"}, personal:"enfermero/tec.médico"});
		Examen.create({nombre:"Criopreservación espermática",horario:{hora_inicio:"8:00",hora_termino:"14:00"}, personal:"enfermero/tec.médico"});
		Examen.create({nombre:"Ovodonación",horario:{hora_inicio:"8:00",hora_termino:"14:00"}, personal:"enfermero/tec.médico"});
		Examen.create({nombre:"Donación de semen",horario:{hora_inicio:"8:00",hora_termino:"14:00"}, personal:"enfermero/tec.médico"});
		
	}
})

};
exports.createDefaultExamenes = createDefaultExamenes;
