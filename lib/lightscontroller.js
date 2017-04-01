function LightsController(ns, ew) {
	this.ns = ns;
	this.ew = ew;
}

LightsController.prototype.run = function(timeToChangeDirection, timeToWaitOnYellow) {
	var self = this;

	var timeChangeDir = timeToChangeDirection * 1000,
		timeWaitYel = timeToWaitOnYellow * 1000,
		timeInitiateChange = timeChangeDir - timeWaitYel;

	//Wait 270 seconds before initiating change
	this.mainTimer = setTimeout(function initiateChange() {
		//Initiate the change by changing to yellow
		self.changeToYellow();
		//Wait 30 seconds while lights are yellow before changing direction
		self.yellowTimer = setTimeout(function changeDir() {
			self.changeDirection();
			//Then wait another 270 seconds before initiating the next change
			self.mainTimer = setTimeout(initiateChange, timeInitiateChange);
		}, timeWaitYel)
	}, timeInitiateChange);
}

LightsController.prototype.changeToYellow = function() {
	if(this.ns.getColor() == 'green') {
		this.ns.changeColor('yellow');

	}
	else if(this.ew.getColor() == 'green') {
		this.ew.changeColor('yellow');
	}
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
}

LightsController.prototype.stop = function() {
	clearTimeout(this.mainTimer);
	clearTimeout(this.yellowTimer);
}


// LightsController.prototype.getNS = function() {
// 	return this.ns;
// }
// LightsController.prototype.getNS = function() {
// 	return this.ns;
// }

module.exports = LightsController;