// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'),
	Schema = mongoose.Schema;

// Definir un nuevo Schema llamado 'UserSchema'
var UserSchema = new Schema({
	username:{type:String,lowercase:true,required:true,unique:true},
	password:{type:String,required:true},
	email:{type:String,lowercase:true,required:true,unique:true}
});

// antes de guardar un nuevo usuario hashear el password del usuario
UserSchema.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.password, null, null, function(err,hash){
		if(err) return next(err);
		user.password = hash;
		next();
	});
});

// metodo para obtener una representacion hash del password
UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password);
};


// Crear modelo 'User' a partir de 'UserSchema'
module.exports = mongoose.model('User', UserSchema);
