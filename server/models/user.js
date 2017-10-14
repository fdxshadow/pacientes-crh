// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');
	

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		lowercase: true,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true},
	email: {
		type: String,
		lowercase: true,
		required: true,
		unique: true
	}
});

UserSchema.pre('save', function(next){
	var user = this;
	bcrypt.hash(user.password, null, null, function(err,hash){
		if(err) return next(err);
		user.password = hash;
		next();
	});
});

UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', UserSchema);

function createDefaultUsers(){
    User.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            User.create({
                username:'francisco',
                password: 'francisco',
                email: 'correoDoctor1@example.com'});
            User.create({
                username:'elias',
                password: 'elias',
                email: 'correoDoctor2@example.com'});
            User.create({
                username:'claudio',
                password: 'claudio',
                email:'correoDoctor1@example.com'});
        }
    })
}

exports.createDefaultUsers = createDefaultUsers;