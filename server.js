var Light = require('./lib/light');
var LightsController = require('./lib/lightscontroller');
var ns = new Light('red');
var ew = new Light('green');
var controller = new LightsController(ns, ew);

var express = require('express');
var app = express();

app.use('/public', express.static('public'));

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
	res.render('index.html');
})

app.get('/run', function (req, res) {
	console.log(req.query);
	controller.run(req.query.timechange, req.query.timeyellow)
	res.send('Running with intervals: ' + req.query.timechange + ' ' + req.query.timeyellow)
})

app.get('/ns', function (req, res) {
	res.send(ns.getColor());
})

app.get('/ew', function (req, res) {
	res.send(ew.getColor());
})

app.get('/stop', function (req, res) {
	controller.stop();
	res.send('Stopped');
})

app.listen(3000, function () {
	console.log('Traffic Lights application listening on port 3000')
})