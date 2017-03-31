function LightsController(ns, ew) {
	this.ns = ns;
	this.ew = ew;
}

LightsController.prototype.run = function(timeToChange, timeForYellow) {
	this.interval = setInterval(() => {
		this.changeToYellow();
		this.timeout = setTimeout(() => {
			this.changeDirection();
		}, timeForYellow);
	}, timeToChange - timeForYellow);
}

LightsController.prototype.changeToYellow = function() {
	if(this.ns.color == 'green') {
		this.ns.changeColor('yellow');

	}
	else if(this.ew.color == 'green') {
		this.ew.changeColor('yellow');
	}
}

LightsController.prototype.changeDirection = function() {
	if(this.ns.color == 'yellow') {
		this.ns.changeColor('red');
		this.ew.changeColor('green');

	}
	else if(this.ew.color == 'yellow') {
		this.ns.changeColor('green');
		this.ew.changeColor('red');
	}
}

LightsController.prototype.stop = function() {
	clearInterval(this.interval);
	clearTimeout(this.timeout);
}

module.exports = LightsController;