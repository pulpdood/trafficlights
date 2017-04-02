var EventEmitter = require('events');

function LightsController(ns, ew) {
	this.ns = ns;
	this.ew = ew;
	this.secondsElapsed = 0;

	//Every time a change occurs or a second has passed,
	//we emit an event to the exposed emitter
	this.changeEmitter = new EventEmitter();
}

//Starts the timing and coordination of the traffic lights controller.
//This is the core logic of the traffic lights controller
LightsController.prototype.run = function(timeToChangeDirection, timeToWaitOnYellow) {
	var self = this;

	this.mainTimer = setInterval(() => {
		this.secondsElapsed++;
		this.changeEmitter.emit('tick', this.secondsElapsed);
		if(this.secondsElapsed % timeToChangeDirection == timeToChangeDirection - timeToWaitOnYellow) {
			this.changeToYellow();
		}
		if(this.secondsElapsed % timeToChangeDirection == 0) {
			this.changeDirection();
		}
	}, 1000)
}

//Changes the current green lights to yellow
//Only changes one of them if they're both green
LightsController.prototype.changeToYellow = function() {
	if(this.ns.getColor() == 'green') {
		this.ns.changeColor('yellow');

	}
	else if(this.ew.getColor() == 'green') {
		this.ew.changeColor('yellow');
	}

	//We emit an event to thee exposed emitter so that the outside can listen to see when events occur inside the controller
	this.changeEmitter.emit('initiateChange');
}

//Changes the current yellow lights to red and current red lights to green 
LightsController.prototype.changeDirection = function() {
	if(this.ns.getColor() == 'yellow') {
		this.ns.changeColor('red');
		this.ew.changeColor('green');

	}
	else if(this.ew.getColor() == 'yellow') {
		this.ns.changeColor('green');
		this.ew.changeColor('red');
	}
	this.changeEmitter.emit('changeDirection');
}

//Stop the traffic light system and timer
LightsController.prototype.stop = function() {
	this.secondsElapsed = 0;
	clearInterval(this.mainTimer);
}

LightsController.prototype.getEmitter = function() {
	return this.changeEmitter;
}

LightsController.prototype.getSecondsElapsed = function() {
	return this.secondsElapsed;
}

module.exports = LightsController;