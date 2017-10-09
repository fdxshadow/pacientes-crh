// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

// Definir un nuevo Schema llamado 'UserSchema'
var UserSchema = new Schema({
	nombre: {
		type: String,
		required: 'Debe ingresar los nombres del nuevo usuario'
	},
	apellido: {
		type: String,
		required: 'Debe ingresar los apellidos del nuevo usuario'
	},
	email: {
		type: String,
		// validar formato email
		match: [/.+\@.+\..+/, 'Ingrese una dirección de email válida'],
		required: 'Debe ingresar la dirección de email'
	},
	username: {
		type: String,
		// configurar 'user.username' como indice único (que no se puede repetir)
		unique: true,
		required: 'Debe ingresar el Nombre de Usuario',
		trim: true
	},
	password: {
		type: String,
		required: 'Debe ingresar una contraseña',
		// validar el valor length de 'password'
		validate: [
			function(password){
				return password && password.length > 6;
			}, 'La contraseña debe contener al menos 6 simbolos'
		]
	},
	tipoUsuario: {
		type: String,
		required: 'Debe ingresar el Tipo de Usuario'
	},
	// para hacer hash de la contraseña
	salt: String,
	// indica la estrategia de autentificacion
	provider: {
		type: String,
		// Validar existencia del valor provider
		required: 'Provider is required'
	},
	// id de usuario para la estrategia de autentificación
	providerId: String,
	// 
	providerData: {},
	created: {
		type: Date,
		default: Date.now
	}
});

// antes de guardar un nuevo usuario hashear el password del usuario
UserSchema.pre('save', function(next){
	if(this.password){
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

// metodo para obtener una representacion hash del password
UserSchema.methods.hashPassword = function(password){
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
}

// autenticar al usuario al momento de hacer login
UserSchema.methods.authenticate = function(password){
	return this.password === this.hashPassword(password);
};


//Configura el 'UserSchema' para usar getters y virtuals cuando se transforme a JSON
UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

// Crear modelo 'User' a partir de 'UserSchema'
mongoose.model('User', UserSchema);
