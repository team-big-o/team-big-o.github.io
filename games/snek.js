$(() => {
	let canvas = $('canvas')[0];
	canvas.height = 10 * 50;
	canvas.width = 10 * 50;
	let context = canvas.getContext('2d');

	function rand(x, y) {
		return (x + Math.random() * (y - x + 1));
	}

	function mod(n, m) {
		return ((n % m) + m) % m;
	}

	let points, food, direction, to_add;
	function reset() {
		points = [[25, 25]];
		food = [Math.floor(rand(0, 49)), Math.floor(rand(0, 49))];
		direction = 'right';
		to_add = 3;
	}

	$(document).keydown(event => {
		switch (event.originalEvent.key) {
			case 'w':
			case 'ArrowUp':
				direction = 'up';
				break;
			case 'a':
			case 'ArrowLeft':
				direction = 'left';
				break;
			case 's':
			case 'ArrowDown':
				direction = 'down';
				break;
			case 'd':
			case 'ArrowRight':
				direction = 'right';
				break;
		}
	});

	function render() {
		// clear the screen
		context.fillStyle = "black";
		context.fillRect(0, 0, canvas.width, canvas.height);
		// move by one
		if (to_add > 0) {
			to_add--;
		} else points.pop();
		switch (direction) {
			case 'up':
				points.unshift([points[0][0], points[0][1] - 1]);
				break;
			case 'left':
				points.unshift([points[0][0] - 1, points[0][1]]);
				break;
			case 'down':
				points.unshift([points[0][0], points[0][1] + 1]);
				break;
			case 'right':
				points.unshift([points[0][0] + 1, points[0][1]]);
				break;
		}
		// draw all the points
		for (let i in points) {
			let point = points[i];
			point[0] = mod(point[0], 50);
			point[1] = mod(point[1], 50);
			context.fillStyle = "gray";
			context.fillRect(point[0] * 10, point[1] * 10, 10, 10);
			if (i > 0 && point[0] === points[0][0] && point[1] === points[0][1]) {
				alert('dead!');
				reset();
			}
		}
		// if touching food
		if (points[0][0] === food[0] && points[0][1] === food[1]) {
			to_add += 3;
			food = [Math.floor(rand(0, 49)), Math.floor(rand(0, 49))];
		}
		// draw the food and river
		context.fillStyle = 'rgb(128, 128, 0)';
		context.fillRect(food[0] * 10, food[1] * 10, 10, 10);
		// if touching self

	}
	reset();
	setInterval(() => window.requestAnimationFrame(render), 100);
});