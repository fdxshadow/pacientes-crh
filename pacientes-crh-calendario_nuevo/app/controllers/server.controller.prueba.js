// Invocar modo JavaScript 'strict'
'use strict';

exports.render = function(req, res) {
	
	res.render('prueba', {
		title: 'Sistema'
	});
};