var express = require('express');
var router = express.Router();

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
	res.render('consulta', { title: 'consulta' });
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
