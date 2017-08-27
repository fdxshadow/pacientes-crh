// Invocar al modo JavaScript 'strict'
'use strict';

// cargar controller 'users'
var users = require('../../app/controllers/server.controller.users'),
	passport = require('passport');

module.exports = function (app) {
	app.route('/pico').post(users.create);
}