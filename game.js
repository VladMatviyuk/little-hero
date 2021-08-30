const CANVAS = document.getElementById("game");
const CTX = CANVAS.getContext("2d");

const level = prompt('Level: 1, 2, 3?', 1);

let ballsCount = 0;
switch (level) {
	case '1': ballsCount = 3; break;
	case '2': ballsCount = 6; break;
	case '3': ballsCount = 9; break;
	default: ballsCount = 3;
}

let score = 0;
let ballRadius = 10;


// Parameters hero
let heroHeight = 20;
let heroWidth = 20;
let heroX = 20;
let heroY = 20;
let heroSpeed = 2;

let balls = [
	{
		x: CANVAS.width / 2,
		y: CANVAS.height - 100,
		radius: 10,
		speedX: 0.6,
		speedY: -0.6,
	}
];

let bonus = [];

// Key handler parameters
let rightPressed = false;
let leftPressed = false;
let topPressed = false;
let bottomPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.key == "d" || e.key == "ArrowRight")
		rightPressed = true
	else if (e.key == "a" || e.key == "ArrowLeft")
		leftPressed = true
	else if (e.key == "w" || e.key == "ArrowUp")
		topPressed = true
	else if (e.key == "s" || e.key == "ArrowDown")
		bottomPressed = true
}

function keyUpHandler(e) {
	if (e.key == "d" || e.key == "ArrowRight")
		rightPressed = false;
	else if (e.key == "a" || e.key == "ArrowLeft")
		leftPressed = false;
	else if (e.key == "w" || e.key == "ArrowUp")
		topPressed = false;
	else if (e.key == "s" || e.key == "ArrowDown")
		bottomPressed = false;
}

function drawBall(ball) {
	CTX.beginPath();
	CTX.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	CTX.fillStyle = "#0095DD";
	CTX.fill();
	CTX.closePath();
}

function drawHero() {
	CTX.beginPath();
	CTX.rect(heroX, heroY, heroWidth, heroHeight);
	CTX.fillStyle = "#0095DD";
	CTX.fill();
	CTX.closePath();
}

function goBall(ball) {
	ball.x += ball.speedX;
	ball.y += ball.speedY;
}

function scoreUpdate() {
	score += 10;
}

function drawScore() {
	CTX.font = "16px Arial";
	CTX.fillStyle = "#0095DD";
	CTX.fillText("Score: " + score, CANVAS.width - 100, 20);
}

function wallForBall(ball) {
	if (ball.x + ball.speedX > CANVAS.width - ball.radius
		|| ball.x + ball.speedX < ball.radius) ball.speedX = -ball.speedX;

	if (ball.y + ball.speedY > CANVAS.height - ball.radius
		|| ball.y + ball.speedY < ball.radius) ball.speedY = -ball.speedY;
}

function wallChecked() {
	if (rightPressed) {
		heroX += heroSpeed;
		if (heroX + heroWidth > CANVAS.width - 20) heroX = CANVAS.width - heroWidth - 20;
	} else if (leftPressed) {
		heroX -= heroSpeed;
		if (heroX < 20) heroX = 20;
	} else if (topPressed) {
		heroY -= heroSpeed;
		if (heroY < 20) heroY = 20;
	} else if (bottomPressed) {
		heroY += heroSpeed;
		if (heroY + heroHeight > CANVAS.height - 20) heroY = CANVAS.height - heroHeight - 20;
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
			CTX.beginPath();
			CTX.arc(bonus.x, bonus.y, bonus.radius, 0, Math.PI * 2);
			CTX.fillStyle = "#37E91E";
			CTX.fill();
			CTX.closePath();
		})
	}
}

function createBall() {
	if (balls.length < ballsCount) {
		var newBall = {
			x: CANVAS.width / 2,
			y: CANVAS.height - 100,
			radius: Math.floor((Math.random() * 15) + 6),
			speedX: 0.3,
			speedY: -0.3,
		}
		balls.push(newBall);
	}
}

function collisionHeroAndBonus() {
	if (bonus.length != 0) {
		if (bonus[0].x > heroX
			&& bonus[0].x < heroX + heroWidth + 1.7
			&& bonus[0].y > heroY
			&& bonus[0].y < heroY + heroHeight + 1.7) {
			score += 150;
			bonus.splice(0, 1);

			balls.map((ball) => {
				ball.speedX = Math.abs(ball.speedX) + 0.3;
				ball.speedY = Math.abs(ball.speedY) + 0.3;
			})
		}
	}
}

function dieHero(ball) {
	if (ball.x > heroX && ball.x < heroX + heroWidth + 1.7 && ball.y > heroY && ball.y < heroY + heroHeight + 1.7) {
		alert("GAME OVER! Score: " + score);
		document.location.reload();
		clearInterval(interval);
	}
}

function draw() {
	CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

	drawBonus();
	drawHero();
	drawScore();

	balls.map((ball) => {
		drawBall(ball);
		wallForBall(ball);
		goBall(ball);
		dieHero(ball);
	})

	wallChecked();
	collisionHeroAndBonus()
}

var intervalScore = setInterval(scoreUpdate, 1000);
var intervalBous = setInterval(createBonus, 5000);
var intervalCreateBall = setInterval(createBall, 5000)
var interval = setInterval(draw, 5);