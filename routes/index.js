var express = require('express');
var router = express.Router();


//ruta de colecciones
var usuario = require('../moduls/usuario');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Index' });
});

router.get('/opciones', function(req, res, next) {
	res.render('opciones', { title: 'opciones' });
});

router.get('/registro', function(req, res, next) {
	res.render('registro', { title: 'registro' });
});

router.get('/baja', function(req, res, next) {
	res.render('baja', { title: 'baja' });
});

router.get('/modifica', function(req, res, next) {
	res.render('modifica', { title: 'modifica' });
});

router.get('/consulta', function(req, res, next) {
	consulta(req, res)
});

//inicio sesion
router.post('/inicia', function(req, res, next) {
	
	usuario.find({ _id: req.body.id, contrasenia: req.body.contra }, function(error, documento){
		if( !error && documento[0]!=undefined ){
			req.session.datos = documento;
			res.redirect('/opciones');
		}else{
			res.redirect('/')
		}
	});
})

//nuevo usuario
router.post('/registra', function(req, res, next) {

	var datos = new usuario({
				_id: 			req.body.nombre,
				apellido: 		req.body.apellido,
				edad: 			req.body.edad,
				contrasenia: 	req.body.contrasenia
	});
	
	datos.save( function(error, documento){
		if( !error ){
			res.redirect('/opciones');
		}else{
			res.redirect('/registro');			
		}
	});
})

//modifica info
router.post('/modifica', function(req, res, next) {

	usuario.update({_id: req.body.nombreViejo},{
			$set:{
				apellido: 		req.body.apellido,
				edad: 			req.body.edad,
				contrasenia: 	req.body.contrasenia
					
			}
		}, function(error, documento){
			if(!error){
				res.redirect('/opciones');
			}else{
				console.log(error)
				res.redirect('/modifica')
			}
	});
});

//consulta info
function consulta (req, res){

	usuario.find({}, function(error, documento){
		if( !error && documento[0] != undefined ){
			req.session.amigos = documento;
			res.render('consulta', {title: 'Principal',
							 datos: req.session.datos,
							 amigos: req.session.amigos});
		}
	});
}

router.post('/baja', function(req, res, next) {
	usuario.remove({_id: req.body.nombre}, function(error, documento){
		if(!error){
			res.redirect('/')
		}
	})
});




router.get('/inicio', function(req, res, next) {
	res.render('inicio', { title: 'Inicio',
						  nombre: 'Diego',
						  suma: 2+2 });
});

router.get('/obten', function(req, res, next) {
	res.render('datos', { title: 'Datos',
						  datos: req.session.datos });
});

router.post('/inicio', function(req, res, next) {
	res.redirect('/inicio')
	
});

router.post('/obten', function(req, res, next) {
	var variable1 = req.body.nombre;
	var variable2 = req.body.edad;
	var variable3 = req.body.color;
	req.session.datos = { nombre: variable1, 
						  edad: variable2, 
						  color: variable3}
	res.redirect('/obten')	
});

module.exports = router;
