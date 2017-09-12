module.exports = function(app){
	var index = require('../controllers/server.controller.index');
	app.get('/', index.render);

	app.route('/calpaciente')
		.get( function(req, res) {
					res.redirect('/#!/reservaSecretaria');
		});

		app.route('/calsecretaria')
			.get( function(req, res) {
						res.redirect('/#!/reservaSecretaria');
			});
}
