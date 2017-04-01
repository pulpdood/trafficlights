var LightsController = require('./lib/lightscontroller');
var Light = require('./lib/light');

//Time intervals as set in the spec
const CHANGE_INTERVAL = 300;
const YELLOW_LIGHT_INTERVAL = 30;

//The actual lights and the light controller
var northSouth = new Light('red');
var eastWest = new Light('green');

var controller = new LightsController(northSouth, eastWest);

var seconds = 0;

//Start the traffic light controller box
controller.run(CHANGE_INTERVAL, YELLOW_LIGHT_INTERVAL);

//Check the status of the lights every second
setInterval(() => {
	seconds++;
	console.log('Lights @ ' + seconds + ' seconds');
	console.log('North South = ' + northSouth.getColor());
	console.log('East West = ' + eastWest.getColor());
}, 1000);