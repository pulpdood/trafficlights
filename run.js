var LightsController = require('./lib/lightscontroller'),
	Light = require('./lib/light');

//Time intervals as set in the spec (seconds)
var CHANGE_INTERVAL = 300,
	YELLOW_LIGHT_INTERVAL = 30;

//The actual lights and the light controller
var northSouth = new Light('red');
var eastWest = new Light('green');

var controller = new LightsController(northSouth, eastWest);

var secondsElapsed = 0;

//Start the traffic light controller
controller.run(CHANGE_INTERVAL, YELLOW_LIGHT_INTERVAL);

//Print initial state
printLights('0:00');

//Print the status of the lights when they change
controller.getEmitter().on('initiateChange', function() {
	console.log('Changing to Yellow')
	printLights(formatSeconds(controller.getSecondsElapsed()));
})

controller.getEmitter().on('changeDirection', function() {
	console.log('Changing Directions')
	printLights(formatSeconds(controller.getSecondsElapsed()));
})

//Print the current time
controller.getEmitter().on('tick', function(seconds) {
	console.log(formatSeconds(seconds));
});

//Utility Functions
function formatSeconds(seconds) {
	var formatted = Math.floor(seconds / 60) + ':' ;
	formatted += ((seconds % 60 < 10) ? '0' : '') + seconds % 60;

	return formatted;
}

function printLights(time) {
	console.log('Lights @ ' + time);
	console.log('North South = ' + northSouth.getColor());
	console.log('East West = ' + eastWest.getColor());
	console.log('----------');
}