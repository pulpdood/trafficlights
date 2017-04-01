var interval;

$('#start').click(function() {
	var timeChange = $('#timechange').val();
	var timeYellow = $('#timeyellow').val();
	if(timeChange < timeYellow || timeYellow < 1) {
		console.log('Invalid times entered');
		return;
	}

	start(timeChange, timeYellow);
})

$('#stop').click(function() {
	stop();
})

function start(timeChange, timeYellow) {
	stop();

	$.ajax(
		{
			url: '/run?timechange=' + timeChange + '&timeyellow=' + timeYellow,
			type: 'get'
		}
	).done(function(resp) {
		update();
		interval = setInterval(function() {
			update();
		}, 500);
		console.log(resp);
	}).fail(function(resp) {
		console.log('Failed Response: ' + resp);
	})
}

function stop() {
	$.ajax(
		{
			url: '/stop',
			type: 'get'
		}
	).done(function(resp) {
		clearInterval(interval);
		console.log(resp);
	}).fail(function(resp) {
		console.log('Failed Response: ' + resp);
	})
}

function update() {
	$.ajax(
		{
			url: '/ns',
			type: 'get'
		}
	).done(function(resp) {
		if(resp == 'green') {
			$('#north').attr('src', '/public/green.png');
			$('#south').attr('src', '/public/green.png');
		}
		if(resp == 'yellow') {
			$('#north').attr('src', '/public/yellow.png');
			$('#south').attr('src', '/public/yellow.png');
		}
		if(resp == 'red') {
			$('#north').attr('src', '/public/red.png');
			$('#south').attr('src', '/public/red.png');
		}
	}).fail(function(resp) {
		console.log('Failed Response: ' + resp);
	})

	$.ajax(
		{
			url: '/ew',
			type: 'get'
		}
	).done(function(resp) {
		if(resp == 'green') {
			$('#east').attr('src', '/public/green.png');
			$('#west').attr('src', '/public/green.png');
		}
		if(resp == 'yellow') {
			$('#east').attr('src', '/public/yellow.png');
			$('#west').attr('src', '/public/yellow.png');
		}
		if(resp == 'red') {
			$('#east').attr('src', '/public/red.png');
			$('#west').attr('src', '/public/red.png');
		}
	}).fail(function(resp) {
		console.log('Failed Response: ' + resp);
	})
}