var LightsController = require('./lib/lightscontroller');
var Light = require('./lib/light');

//Time intervals as set in the spec
const CHANGE_INTERVAL = 4000;
const YELLOW_LIGHT_INTERVAL = 1000;

//The actual lights and the light controller
var northSouth = new Light('red');
var eastWest = new Light('green');

var controller = new LightsController(northSouth, eastWest);

//Date time for output
var date = new Date()
var startTime = date.getTime();

//Start the traffic light controller box
controller.run(CHANGE_INTERVAL, YELLOW_LIGHT_INTERVAL);

//Check the status of the lights every second
setInterval(() => {
	date = new Date();
	var currentTime = Math.floor((date.getTime() - startTime) / 1000);
	console.log('Lights @ ' + currentTime + ' seconds');
	console.log('North South = ' + northSouth.color);
	console.log('East West = ' + eastWest.color);
}, 1000);

//tests:

//use set interval in tests.
//assert lights stay yellow for 30 seconds before changing to green