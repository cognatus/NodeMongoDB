var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.session.titulo = 'Bienvenido, crea tu titulo'
	res.render('index', { title: req.session.titulo });
});

router.get('/inicio', function(req, res, next) {
	res.render('inicio', { title: req.session.titulo,
						  nombre: 'Diego',
						  suma: 2+2 });
});

router.get('/obten', function(req, res, next) {
	/*res.render('datos', { title: req.session.titulo,
						  nom: req.session.datos.nombre,
						  ed: req.session.datos.edad,
						  col: req.session.datos.color });*/
	res.render('datos', { title: req.session.titulo,
						  datos: req.session.datos });
});

router.post('/inicio', function(req, res, next) {
	var titulo = req.body.titulo;
	req.session.titulo = titulo;
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
