var myGamePiece;
var dropItems = [];
var myScore;
var score = 0;


function startGame() {
	myGamePiece = new component(30, 30, "blue", 64, 128, "blue", true);
	myGamePiece.gravity = 0.05;
	myScore = new component("30px", "Consolas", "black", 280, 40, "text", true);
	myGameArea.start();
	var controlLock = false;
	document.onkeydown = function(e) {
		switch (e.keyCode) {
			case 37:
				move(-5);
				break;
			case 39:
				move(5);
				break;
		}
	};

	document.onkeyup = function(e) {
		switch (e.keyCode) {
			case 37:
			case 39:
				move(0);
				break;
		}
	};
}

function imageReturn (type){
	if (type == "green"){
		var img1 = document.createElement('img');
		img1.src = '../../assets/images/raindrop-good-small.png';
		return img1;
	} else if (type == "red"){
		var img2 = document.createElement('img');
		img2.src = '../../assets/images/raindrop-bad-small.png';
		return img2;
	} else if (type == "blue"){
		var img3 = document.createElement('img');
		img3.src = '../../assets/images/bucket-man.png';
		return img3;
	}
}


var myGameArea = {
	canvas: document.createElement("canvas"),
	start: function() {
		this.canvas.width = 480;
		this.canvas.height = 270;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 20);
	},
	clear: function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function component(width, height, color, x, y, type, good) {
	this.type = type;
	this.score = 0;
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.good = good;
	this.x = x;
	this.y = y;
	this.gravity = 0;
	this.gravitySpeed = 0;
	this.update = function() {
		ctx = myGameArea.context;
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		} else if (this.type == "green") {
			var imgGood = imageReturn (this.type);
			ctx.drawImage (imgGood, this.x, this.y, 60, 60);
		} else if (this.type == "red") {
			var imgBad = imageReturn (this.type);
			ctx.drawImage (imgBad, this.x, this.y, 60, 60);
		} else if (this.type == "blue") {
			var imgMan = imageReturn (this.type);
			ctx.drawImage (imgMan, this.x, this.y, 64, 128);
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	this.newPos = function() {
		this.x += this.speedX;
		this.hitRight();
		this.hitLeft();
	}

	this.hitRight = function() {
		var rightwall = myGameArea.canvas.width - this.width;
		if (this.x > rightwall) {
			this.x = rightwall;
			move(-1);
			move(0);
		}
	}

	this.hitLeft = function() {
		var leftwall = 0;
		if (this.x < leftwall) {
			this.x = leftwall;
			move(1);
			move(0);
		}
	}

	this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = false;
		if (otherleft < myright && myleft < otherright && otherbottom >= mytop) {
			crash = true;
		}
		return crash;
	}
}

function updateGameArea() {
	var x, height, gap, minHeight, maxHeight, minGap, maxGap;
	for (i = 0; i < dropItems.length; i += 1) {
		if (myGamePiece.crashWith(dropItems[i])) {
			//console.log(dropItems[i].good);
			if (dropItems[i].good){
				score += 10;
			} else {
				score -= 10;
			}
      dropItems.splice(i, 1);
		}
	}
	myGameArea.clear();

	myGameArea.frameNo += 1;
	if (myGameArea.frameNo == 1 || everyinterval(75)) {
		x = myGameArea.canvas.width;
		y = myGameArea.canvas.height;
		minSpawnX = 40;
		maxSpawnX = 440;
		spawnX = Math.floor(Math.random() * (maxSpawnX - minSpawnX + 1) + minSpawnX);

		var rand = Math.floor(Math.random() * 100) + 1;
		if (rand <= 75){
				dropItems.push(new component(20, 20, "green", spawnX, 0, "green", true));
		} else {
				dropItems.push(new component(20, 20, "red", spawnX, 0, "red", false));
		}

	}
	for (i = 0; i < dropItems.length; i += 1) {
		dropItems[i].y += 1;
		dropItems[i].update();
    if (dropItems[i].y >= myGameArea.canvas.height){
      dropItems.splice(i, 1);
    }
	}

	myScore.text = "SCORE: " + score;
	myScore.update();
	myGamePiece.newPos();
	myGamePiece.update();
}

function everyinterval(n) {
	if ((myGameArea.frameNo / n) % 1 == 0) {
		return true;
	}
	return false;
}

function move(n) {
	myGamePiece.speedX = n;
}
