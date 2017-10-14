'use strict';

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
                email: 'francisco@example.com'
            });
            User.create({
                username:'elias',
                password: 'elias',
                email: 'elias@example.com'
            });
            User.create({
                username:'claudio',
                password: 'claudio',
                email:'claudio@example.com'
            });
            User.create({
                username:'juan',
                password: 'juan',
                email:'juan@example.com'
            });
            User.create({
                username:'carlos',
                password: 'carlos',
                email:'carloss@example.com'
            });
            User.create({
                username:'rodrigo',
                password: 'rodrigo',
                email:'rodrigo@example.com'
            });
        }
    })
}

exports.createDefaultUsers = createDefaultUsers;