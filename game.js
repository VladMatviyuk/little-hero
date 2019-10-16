console.log('game start');

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var score = 0;
var ballRadius = 10;

var balls = [
	{
		x: canvas.width / 2,
		y: canvas.height - 100,
		radius: 10,
		speedX: 0.6,
		speedY: -0.6,
	}
];
var bonus = [];

var heroHeight = 20;
var heroWidth = 20;
var heroX = 20;
var heroY = 20;
var heroSpeed = 2;

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

function drawBall(ball) {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
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

	drawBonus();
	drawHero();
	drawScore();

	balls.map((ball) => {
		drawBall(ball);
		fallForBall(ball);
		goBall(ball);
		dieHero(ball);
	})

	if (rightPressed) {
		heroX += heroSpeed;
		if (heroX + heroWidth > canvas.width - 20) {
			heroX = canvas.width - heroWidth - 20;
		}
	}
	else if (leftPressed) {
		heroX -= heroSpeed;
		if (heroX < 20) {
			heroX = 20;
		}
	}
	else if (topPressed) {
		heroY -= heroSpeed;
		if (heroY < 20) {
			heroY = 20;
		}

	}
	else if (bottomPressed) {
		heroY += heroSpeed;
		if (heroY + heroHeight > canvas.height - 20) {
			heroY = canvas.height - heroHeight - 20;
		}
	}

	if (bonus.length != 0) {
		if (bonus[0].x > heroX && bonus[0].x < heroX + heroWidth + 1.7 && bonus[0].y > heroY && bonus[0].y < heroY + heroHeight + 1.7) {
			score += 150;
			bonus.splice(0, 1);
			balls.map((ball) => {
				ball.speedX = Math.abs(ball.speedX) + 0.3;
				ball.speedY = Math.abs(ball.speedY) + 0.3;
			})
		}
	}
}

function goBall(ball) {
	ball.x += ball.speedX;
	ball.y += ball.speedY;
}

function scoreUpdate() {
	score += 10;
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: " + score, canvas.width - 100, 20);
}

function fallForBall(ball) {
	if (ball.x + ball.speedX > canvas.width - ball.radius || ball.x + ball.speedX < ball.radius) {
		ball.speedX = -ball.speedX;
	}
	if (ball.y + ball.speedY > canvas.height - ball.radius || ball.y + ball.speedY < ball.radius) {
		ball.speedY = -ball.speedY;
	}
}

function createBonus() {
	var x = Math.floor((Math.random() * 350) + 30);
	var y = Math.floor((Math.random() * 200) + 30);
	var radius = 7;
	bonus.splice(0, 1);
	bonus.push({ x: x, y: y, radius: radius });
	drawBonus();
}

function drawBonus() {
	if (bonus.length != 0) {
		bonus.map((bonus) => {
			ctx.beginPath();
			ctx.arc(bonus.x, bonus.y, bonus.radius, 0, Math.PI * 2);
			ctx.fillStyle = "#37E91E";
			ctx.fill();
			ctx.closePath();
		})
	}
}

function createBall() {
	if (balls.length < 3) {
		var newBall = {
			x: canvas.width / 2,
			y: canvas.height - 100,
			radius: Math.floor((Math.random() * 15) + 6),
			speedX: 0.3,
			speedY: -0.3,
		}
		balls.push(newBall);
	}
}

function dieHero(ball) {
	if (ball.x > heroX && ball.x < heroX + heroWidth + 1.7 && ball.y > heroY && ball.y < heroY + heroHeight + 1.7) {
		alert("GAME OVER! Score: " + score);
		document.location.reload();
		clearInterval(interval);
	}
}
var intervalScore = setInterval(scoreUpdate, 1000);
var intervalBous = setInterval(createBonus, 5000);
var intervalCreateBall = setInterval(createBall, 10000)
var interval = setInterval(draw, 5);