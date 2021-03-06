//Note: Should use a framework for binding NS and EW to variables that the application
//can then use to render the correct lights.
var ns = 'red';
var ew = 'green';
var secondsElapsed = 0;

$('#start').click(function() {
	//Get values of times inputted
	var timeChange = parseInt($('#timechange').val());
	var timeYellow = parseInt($('#timeyellow').val());

	//Make sure the inputted values are valid
	if(timeChange < timeYellow || timeYellow < 1) {
		console.log('Invalid durations entered');
		$('#info').html('Invalid durations entered');
		return;
	}

	stop();

	//Call the server to start the traffic light system
	start(timeChange, timeYellow);
});

$('#stop').click(function() {
	stop();
});

if (!!window.EventSource) {
	var source = new EventSource('/socket');

	source.addEventListener('message', function(e) {
		if(e.data) {
			var data = JSON.parse(e.data);
			if(data.status == 'ok') {
				secondsElapsed = data.secondsElapsed;
				ns = data.ns;
				ew = data.ew;
				update(data.type);
				console.log(e.data);
			} else {
				console.log('Error in websocket message:');
				console.log(e.data)
			}
		} else {
			console.log('No Data:');
			console.log(e);
		}
	}, false);
}

//Call the server to start the traffic light system
function start(timeChange, timeYellow) {
	$.ajax(
		{
			url: '/run?timechange=' + timeChange + '&timeyellow=' + timeYellow + '&ns=' + ns + '&ew=' + ew,
			type: 'get'
		}
	).done(function(resp) {
		update();
		console.log(resp);
	}).fail(function(resp) {
		console.log('Failed Response:');
		console.log(resp);
	})
}


//Call the server to stop the traffic light system
function stop() {
	$.ajax(
		{
			url: '/stop',
			type: 'get'
		}
	).done(function(resp) {
		console.log(resp);
	}).fail(function(resp) {
		console.log('Failed Response:');
		console.log(resp);
	})
}

//Update what's displayed (if we used a framework we wouldn't need this)
function update(updateType) {
	$('#north').attr('src', '/public/' + ns + '.png');
	$('#south').attr('src', '/public/' + ns + '.png');
	$('#east').attr('src', '/public/' + ew + '.png');
	$('#west').attr('src', '/public/' + ew + '.png');
	$('#info').html(formatSeconds(secondsElapsed));
	if(updateType == 'initiateChange') {
		$('#info').append('<br>Initiating Change');
	}
	else if(updateType == 'changeDirection') {
		$('#info').append('<br>Changing Direction');
	}
}

function formatSeconds(seconds) {
	var formatted = Math.floor(seconds / 60) + ':' ;
	formatted += ((seconds % 60 < 10) ? '0' : '') + seconds % 60;

	return formatted;
}