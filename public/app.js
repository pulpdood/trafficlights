//Note: Should use a framework for binding NS and EW to variables that the application
//can then use to render the correct lights.
var ns = 'red';
var ew = 'green';

$('#start').click(function() {
	var timeChange = parseInt($('#timechange').val());
	var timeYellow = parseInt($('#timeyellow').val());
	if(timeChange < timeYellow || timeYellow < 1) {
		console.log('Invalid times entered');
		return;
	}

	stop();
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
				ns = data.ns;
				ew = data.ew;
				updateLights();
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

function start(timeChange, timeYellow) {
	$.ajax(
		{
			url: '/run?timechange=' + timeChange + '&timeyellow=' + timeYellow + '&ns=' + ns + '&ew=' + ew,
			type: 'get'
		}
	).done(function(resp) {
		updateLights();
		console.log(resp);
	}).fail(function(resp) {
		console.log('Failed Response:');
		console.log(resp);
	})
}

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

function updateLights() {
	$('#north').attr('src', '/public/' + ns + '.png');
	$('#south').attr('src', '/public/' + ns + '.png');
	$('#east').attr('src', '/public/' + ew + '.png');
	$('#west').attr('src', '/public/' + ew + '.png');
}