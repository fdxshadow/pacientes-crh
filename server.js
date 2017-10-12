'use strict';
var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

// Cargar las dependencias de módulos
var mongoose = require('./config/mongoose');

// Crear una nueva instancia conexión Mongoose
var db = mongoose();
// Crear una nueva instancia aplicación Express
require('./config/express')(app);

// configurar archivos de enrutamiento

require('./server/config/routes.js')(app);

app.listen(3000);
// Hacer Log del status del server a la consola
console.log('Servidor ejecutándose en http://localhost:3000/');
// Usar la prpiedad module.exports para exponer nuestra nuestra instancia de la aplicación Express para uso externo

