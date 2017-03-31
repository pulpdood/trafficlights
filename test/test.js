var assert = require('assert');

var LightsController = require('../lib/lightscontroller');
var Light = require('../lib/light');

describe('Lights', function() {
	describe('#changeColor()', function() {
		it('Changes color accordingly', function() {
			var light = new Light('red');

			light.changeColor('yellow')
			assert.equal(light.getColor(), 'yellow');

			light.changeColor('green')
			assert.equal(light.getColor(), 'green');

			light.changeColor('red')
			assert.equal(light.getColor(), 'red');
		});
	});

});

describe('Traffic Lights Controller', function() {
	describe('#changeToYellow()', function() {
		it('Changes the current green lights to yellow (North South)', function() {
			var northSouth = new Light('red');
			var eastWest = new Light('green');
			var controller = new LightsController(northSouth, eastWest);

			controller.changeToYellow();

			assert.equal(northSouth.getColor(), 'red');
			assert.equal(eastWest.getColor(), 'yellow');
		});
		it('Changes the current green lights to yellow (East West)', function() {
			var northSouth = new Light('green');
			var eastWest = new Light('red');
			var controller = new LightsController(northSouth, eastWest);

			controller.changeToYellow();

			assert.equal(northSouth.getColor(), 'yellow');
			assert.equal(eastWest.getColor(), 'red');
		});
	});
	describe('#changeDirection()', function() {
		it('Changes the current yellow lights to red (North South), and current red lights to green (East West)', function() {
			var northSouth = new Light('yellow');
			var eastWest = new Light('red');
			var controller = new LightsController(northSouth, eastWest);

			controller.changeDirection();

			assert.equal(northSouth.getColor(), 'red');
			assert.equal(eastWest.getColor(), 'green');
		});
		it('Changes the current yellow lights to red (East West), and current red lights to green (North South)', function() {
			var northSouth = new Light('red');
			var eastWest = new Light('yellow');
			var controller = new LightsController(northSouth, eastWest);

			controller.changeDirection();

			assert.equal(northSouth.getColor(), 'green');
			assert.equal(eastWest.getColor(), 'red');
		});
	});

});