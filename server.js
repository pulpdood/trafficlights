var Light = require('./lib/light'),
	LightsController = require('./lib/lightscontroller');

var ns = new Light('red'),
	ew = new Light('red'),
	controller = new LightsController(ns, ew);

var express = require('express'),
	app = express();

app.use('/public', express.static('public'));

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
	res.render('index.html');
});

app.get('/run', function (req, res) {
	ns.changeColor(req.query.ns);
	ew.changeColor(req.query.ew);
	controller.run(req.query.timechange, req.query.timeyellow);
	res.send('Running with intervals: ' + req.query.timechange + ' ' + req.query.timeyellow);
});

app.get('/ns', function (req, res) {
	res.send(ns.getColor());
});

app.get('/ew', function (req, res) {
	res.send(ew.getColor());
});

app.get('/socket', function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	});

	controller.getEmitter().on('initiateChange', function() {
		var lights = {ns: ns.getColor(), ew: ew.getColor(), type: 'initiateChange', secondsElapsed: controller.getSecondsElapsed(), status: 'ok'};
		res.write('data: ' + JSON.stringify(lights) + '\n\n');
	});

	controller.getEmitter().on('changeDirection', function() {
		var lights = {ns: ns.getColor(), ew: ew.getColor(), type: 'changeDirection', secondsElapsed: controller.getSecondsElapsed(), status: 'ok'};
		res.write('data: ' + JSON.stringify(lights) + '\n\n');
	});

	controller.getEmitter().on('tick', function() {
		var lights = {ns: ns.getColor(), ew: ew.getColor(), type: 'tick', secondsElapsed: controller.getSecondsElapsed(), status: 'ok'};
		res.write('data: ' + JSON.stringify(lights) + '\n\n');
	});

});

app.get('/stop', function (req, res) {
	controller.stop();
	res.send('Stopped');
});

app.listen(3000, function () {
	console.log('Traffic Lights application listening on port 3000')
});