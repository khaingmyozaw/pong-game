const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Paddles' settings
const PADDLE_WIDTH = 99;
const PADDLE_HEIGHT = 12;
const PADDLE_MARGIN = 16;
const PADDLE_SPEED = 6;

// Ball setting
const BALL_SIZE = 16;
const BALL_SPEED = 1;

let playerPaddleX = WIDTH / 2 - PADDLE_WIDTH / 2;
let botPaddleX = WIDTH / 2 - PADDLE_WIDTH / 2;

let ballX = WIDTH / 2 - BALL_SIZE / 2;
let ballY = HEIGHT / 2 - BALL_SIZE / 2;
let ballVX = BALL_SPEED * (Math.random() * 2 - 1);
let ballVY = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);

// if the val is smaller than min get the min, (preventing from minus values)
// if the val is greater than max get the max, (preventing from greater than canvas' width)
// and if not get the val itself.
function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

// Move player paddle
canvas.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    playerPaddleX = clamp(mouseX - PADDLE_WIDTH / 2, 0, WIDTH - PADDLE_WIDTH);
});

// Move ball
function moveBall() {
    ballX += ballVX;
    ballY += ballVY;

    

    if (ballY <= 0 || ballY >= HEIGHT) {
        // ballY = -ballVY;
        // clamp(ballY, 0, HEIGHT - BALL_SIZE)
        resetBall();
    }

    // hit the player
    if (
        ballY <= PADDLE_MARGIN + PADDLE_HEIGHT && 
        ballX + BALL_SIZE >= playerPaddleX &&
        ballX <= playerPaddleX + PADDLE_WIDTH
    ) {
        ballVY = Math.abs(ballVY);

        let impact = ((ballX - BALL_SIZE / 2) - (playerPaddleX + PADDLE_WIDTH / 2)) / (PADDLE_WIDTH / 2);
        ballVX = BALL_SPEED * impact;
    }
}

function resetBall() {
    ballX = WIDTH / 2 - BALL_SIZE / 2;
    ballY = HEIGHT / 2 - BALL_SIZE / 2;
    ballVX = BALL_SPEED * (Math.random() * 2 - 1);
    ballVY = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
}

// Draw game objects
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // center line
    ctx.setLineDash([16, 18, 1]);
    ctx.strokeStyle = "#666";
    ctx.beginPath();
    ctx.moveTo(0, HEIGHT / 2);
    ctx.lineTo(WIDTH, HEIGHT / 2);
    ctx.stroke();

    // ball
    ctx.fillStyle = "#888";
    ctx.rect(ballX, ballY, BALL_SIZE, BALL_SIZE);
    // player
    ctx.rect(playerPaddleX, HEIGHT - PADDLE_HEIGHT - PADDLE_MARGIN, PADDLE_WIDTH, PADDLE_HEIGHT);
    // bot
    ctx.rect(botPaddleX, PADDLE_MARGIN, PADDLE_WIDTH, PADDLE_HEIGHT);

    ctx.fill();
}

function gameLoop() {
    draw();
    moveBall();
    requestAnimationFrame(gameLoop);
}
gameLoop();