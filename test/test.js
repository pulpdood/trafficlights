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
		it('Changes only one of the green lights to yellow when they are both green', function() {
			var northSouth = new Light('green');
			var eastWest = new Light('green');
			var controller = new LightsController(northSouth, eastWest);

			controller.changeToYellow();

			assert.ok((northSouth.getColor() == 'yellow' && eastWest.getColor() == 'green') || (northSouth.getColor() == 'green' && eastWest.getColor() == 'yellow'));
		});
		it("Doesn't do anything when there are no green lights", function() {
			var northSouth = new Light('red');
			var eastWest = new Light('yellow');
			var controller = new LightsController(northSouth, eastWest);

			controller.changeToYellow();

			assert.equal(northSouth.getColor(), 'red');
			assert.equal(eastWest.getColor(), 'yellow');
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
		it("Doesn't do anything when there are no yellow lights, since the yellow light has to be displayed before changing directions", function() {
			var northSouth = new Light('red');
			var eastWest = new Light('green');
			var controller = new LightsController(northSouth, eastWest);

			controller.changeDirection();

			assert.equal(northSouth.getColor(), 'red');
			assert.equal(eastWest.getColor(), 'green');
		});
	});
	describe('#run()', function() {
		it('Changes direction of lights every X seconds but for Y seconds before changing directions it first changes green to yellow', function(done) {
			this.timeout(10000);

			var northSouth = new Light('green');
			var eastWest = new Light('red');
			var controller = new LightsController(northSouth, eastWest);

			controller.run(3, 1);

			controller.getEmitter().on('initiateChange', () => {
				if(controller.getSecondsElapsed() == 2) {
					assert.equal(northSouth.getColor(), 'yellow');
					assert.equal(eastWest.getColor(), 'red');
				} 
				else if (controller.getSecondsElapsed() == 5) {
					assert.equal(northSouth.getColor(), 'red');
					assert.equal(eastWest.getColor(), 'yellow');
				}
			});
			controller.getEmitter().on('changeDirection', () => {
				if (controller.getSecondsElapsed() == 3) {
					assert.equal(northSouth.getColor(), 'red');
					assert.equal(eastWest.getColor(), 'green');
				}
				else if (controller.getSecondsElapsed() == 6) {	
					assert.equal(northSouth.getColor(), 'green');
					assert.equal(eastWest.getColor(), 'red');
					done();
				}
			});
		});
	});

});