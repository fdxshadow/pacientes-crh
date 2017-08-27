// Invocar al modo JavaScript 'strict'
'use strict';

// cargar modelo 'User' desde mongoDB
var User = require('mongoose').model('User');
	
exports.create = function(req, res, next){
	var user = new User(req.body);
	// usar metodo save para guardar el nuevo usuario
	user.save(function(err){
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.next(err);
		} else {
			// usar objeto response (res) para enviar una respuesta JSON
			res.json(user);
		}
	});
};









