var EventEmitter = require('events');

function LightsController(ns, ew) {
	this.ns = ns;
	this.ew = ew;
	this.secondsElapsed = 0;
	this.changeEmitter = new EventEmitter();
}

LightsController.prototype.run = function(timeToChangeDirection, timeToWaitOnYellow) {
	var self = this;

	this.mainTimer = setInterval(() => {
		this.secondsElapsed++;
		if(this.secondsElapsed % timeToChangeDirection == timeToChangeDirection - timeToWaitOnYellow) {
			this.changeToYellow();
		}
		if(this.secondsElapsed % timeToChangeDirection == 0) {
			this.changeDirection();
		}
	}, 1000)

	// //Wait 270 seconds before initiating change
	// this.mainTimer = setTimeout(function initiateChange() {
	// 	//Initiate the change by changing green to yellow
	// 	self.changeToYellow();
	// 	//Wait 30 seconds while lights are yellow before changing direction
	// 	self.yellowTimer = setTimeout(function changeDir() {
	// 		self.changeDirection();
	// 		//Then wait another 270 seconds before initiating the next change
	// 		self.mainTimer = setTimeout(initiateChange, timeInitiateChange);
	// 	}, timeWaitYellow)
	// }, timeInitiateChange);
}

LightsController.prototype.changeToYellow = function() {
	if(this.ns.getColor() == 'green') {
		this.ns.changeColor('yellow');

	}
	else if(this.ew.getColor() == 'green') {
		this.ew.changeColor('yellow');
	}
	this.changeEmitter.emit('initiateChange');
}

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


// LightsController.prototype.getNS = function() {
// 	return this.ns;
// }
// LightsController.prototype.getNS = function() {
// 	return this.ns;
// }

module.exports = LightsController;