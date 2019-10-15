console.log('game start');

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var score = 0;
var ballRadius = 10;

var x = canvas.width / 2;
var y = canvas.height - 100;
var dx = 7;
var dy = -7;

var heroHeight = 20;
var heroWidth = 20;
var heroX = 0;
var heroY = 0;
var heroSpeed = 4;

var rightPressed = false;
var leftPressed = false;
var topPressed = false;
var bottomPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = true;
	}
	else if (e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = true;
	} else if (e.key == "Up" || e.key == "ArrowUp") {
		topPressed = true;
	} else if (e.key == "Down" || e.key == "ArrowDown") {
		bottomPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = false;
	}
	else if (e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = false;
	}
	else if (e.key == "Up" || e.key == "ArrowUp") {
		topPressed = false;
	}
	else if (e.key == "Down" || e.key == "ArrowDown") {
		bottomPressed = false;
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawHero() {
	ctx.beginPath();
	ctx.rect(heroX, heroY, heroWidth, heroHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawHero();
	drawScore();

	if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}
	if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
		dy = -dy;
	}
	else if (x > heroX && x < heroX + heroWidth + 2 && y > heroY && y < heroY + heroHeight + 2) {
		alert("GAME OVER! Score: " + score);
		document.location.reload();
		clearInterval(interval);
	}

	if (rightPressed) {
		heroX += heroSpeed;
		if (heroX + heroWidth > canvas.width) {
			heroX = canvas.width - heroWidth;
		}
	}
	else if (leftPressed) {
		heroX -= heroSpeed;
		if (heroX < 0) {
			heroX = 0;
		}
	}
	else if (topPressed) {
		heroY -= heroSpeed;
		if (heroY < 0) {
			heroY = 0;
		}

	}
	else if (bottomPressed) {
		heroY += heroSpeed;
		if (heroY + heroHeight > canvas.height) {
			heroY = canvas.height - heroHeight;
		}
	}

	x += dx;
	y += dy;
}

function scoreUpdate() {
	score += 10;
	console.log(score);
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: " + score, canvas.width - 100, 20);
}

var intervalScore = setInterval(scoreUpdate, 1000);
var interval = setInterval(draw, 10);