//coleccion de usuario
var mongoose = require('mongoose');

var Usuario = mongoose.Schema({

	_id: {type: String, required: true},
	apellido: {type: String, required: true},
	edad: {type: String, required: true},
	contrasenia: {type: String, required: true}
	
});

module.exports = mongoose.model('usuario', Usuario);
