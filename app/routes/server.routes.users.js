// cargar controller 'users'
var User = require('../../app/models/server.model.user');
var jwt = require('jsonwebtoken');
var secret = 'dbz';


module.exports = function(router){

	router.post('/users', function(req,res){
		//Escuchando en http://8000/users
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''){
			res.json({success:false, message:'Problema con los datos, ingresar nuevamente'});
		}else{
			user.save(function(err){
				if(err){
					res.json({success:false, message:'Username o email existen !'});
				}else{
					res.json({success:true, message:'Usuario creado!'});
				}
			});
		}

	});


	//Escuchando en http://8000/authenticate

	router.post('/authenticate',function(req,res){
		User.findOne({username:req.body.username}).select('email username password').exec(function(err,user){
			if(err) throw err;

			if(!user){
				res.json({success: false, message: 'Usuario no identificado'});
			}else if(user){
				if (req.body.password) {
				 var validatePassword = user.comparePassword(req.body.password);
				 if (!validatePassword) {
				  res.json({success : false, message : 'Ingresó una contraseña incorrecta!'});  
				 }
				 else{ 
				 	var token = jwt.sign({username:user.username, email:user.email}, secret,{expiresIn: '1m'});
				 	res.json({success : true, message : 'Usuario Autenticado!',token: token });
				 }
				}
				else{
				 res.json({success : false, message : 'No ingresó contraseña!'});
				}﻿
			}
		});
	});

	
	return router;
}