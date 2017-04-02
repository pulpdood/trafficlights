# Traffic Lights

This is a simulation of a traffic light system, with two timers: X which is the time interval that the lights automatically change directions and Y which is the time that a light must stay yellow before changing directions.

This application contains a number of things
1. A traffic lights controller system that utilises a set interval and a second count to coordinate the changing of lights and directions
1. A simple Node js server using Express that contains some simple API routes and a server sent event (SSE) socket, and the traffic lights controller in the backend
1. A front end application which utilises the Node js server and its API
1. Unit tests for the backend system for controlling lights using Mocha

The application works as a standalone Node.js command line application run using: ```node run```, or as a whole Node.js web application using: ```node server``` which will be listening on port 3000.


## Getting Started

### Installation
Clone or download the package, then on the command line while in the directory run ```npm install```.


## Running the appliation
To run the application bare bones just to see it working on the command line, simply run the command ```node run```. The application defaults to 5 minutes before changing directions, with a 30 second wait on yellow light before fully changing.

## Running the server
To run the server, run ```node server``` on the command line. If all works well, you can access the application at ```http://localhost:3000``` and there are instructions on how to run the application on the page itself. Essentially, you can choose X and Y seconds and see a visualisation of what's going on in the backend.


## Testing

### Running the test
Make sure you have mocha installed on your machine by using the command ```npm install -g mocha```. To test simply run the command ```mocha```

### Tests
All tests are straightforward functional tests, with the exception of the last test which will take approximately 6 seconds to complete. 

The logic of the last test is to test the flow of the traffic light controller system. We pass in a small value of X and Y (3 and 1) and then the test waits for changes to be signalled and checks that the lights have changed correctly.


## The Code
The crux of the application is in the ```LightsController``` type. It takes in two ```Light```s each representing the lights opposite each other in a particular direction (e.g. North South). The LightsController has functions to coordinate the changing of lights from green to yellow, and changing directions.

The main function is the ```run``` function which takes in X and Y as mentioned in this readme's introduction. The code of the function is below:

```
	this.mainTimer = setInterval(() => {
		this.secondsElapsed++;
		if(this.secondsElapsed % timeToChangeDirection /*X*/ == timeToChangeDirection /*X*/ - timeToWaitOnYellow /*Y*/) {
			this.changeToYellow();
		}
		if(this.secondsElapsed % timeToChangeDirection /*X*/ == 0) {
			this.changeDirection();
		}
	}, 1000)
```

The function starts an interval which ticks every second. When the seconds counted reaches Y seconds before X seconds has passed, the lights change to yellow, then once the seconds counted reaches X (i.e. Y seconds have passed since he lights have changed to yellow), the lights switch directions. We mod the seconds elapsed with X simply to reset to 0 each time the seconds reach X for easier comparison.

## Room for improvement
There are some things in the application that could be looked at for improvement:
* In ```lightscontroller.js```, there is a second counter which counts all the seconds that have elapsed since running. If left running for a very long time, this counter may overflow which may cause some strange behaviour.
* The timing component in ```lightscontroller.js``` may be better as a separate function on its own.
* The Lights Controller should probably own the traffic lights it's been given and the lights themselves shouldn't be able to be accesseed by outside functions - this would take some refactoring
* The front end application could be written in a better framework