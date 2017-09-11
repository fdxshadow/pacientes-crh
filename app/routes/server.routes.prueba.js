module.exports = function(app){
	var prueba = require('../controllers/server.controller.prueba');
	app.get('/prueba', prueba.render);
}