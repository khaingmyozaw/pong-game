const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Paddles' settings
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 90;
const PADDLE_MARGIN = 16;
const PADDLE_SPEED = 6;

// Ball setting
const BALL_SIZE = 16;
const BALL_SPEED = 6;

const humanPaddleY = HEIGHT / 2 - PADDLE_HEIGHT / 2;
const botPaddleY = HEIGHT / 2 - PADDLE_HEIGHT / 2;

const ballX = WIDTH / 2 - BALL_SIZE / 2;
const ballY = HEIGHT / 2 - BALL_SIZE / 2;

// Draw game objects
draw();
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw middle line
    ctx.setLineDash([16, 18, 1]);
    ctx.strokeStyle = "#888";
    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.stroke();

    // Draw Paddles
    ctx.fillStyle = "#fff";
    ctx.fillRect(PADDLE_MARGIN, humanPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
    // Paddle Bot
    ctx.fillRect(WIDTH - PADDLE_MARGIN - PADDLE_WIDTH, botPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);

    ctx.fillRect(ballX, ballY, BALL_SIZE, BALL_SIZE);
}