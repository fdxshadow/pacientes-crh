// cargar controller 'users'
var User = require('mongoose').model('User');
var jwt = require('jsonwebtoken');
var secret = 'dbz';

exports.createUser = function(req,res){
    var user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    });

    if(user.username == null || user.username == '' || user.password == null || user.password == '' || user.email == null || user.email == ''){
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

};

exports.authenticateUser = function(req, res){
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
            }
        }
    });
};
