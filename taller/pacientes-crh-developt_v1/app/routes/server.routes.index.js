module.exports = function(app){
	var index = require('../controllers/server.controller.index');
	app.get('/', index.render);
}