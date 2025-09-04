const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Paddles' settings
const PADDLE_WIDTH = 94;
const PADDLE_HEIGHT = 12;
const PADDLE_MARGIN = 16;
const PADDLE_SPEED = 6;

// Ball setting
const BALL_SIZE = 16;
const BALL_SPEED = 6;

let humanPaddleX = WIDTH / 2 - PADDLE_WIDTH / 2;
let botPaddleX = WIDTH / 2 - PADDLE_WIDTH / 2;

let ballX = WIDTH / 2 - BALL_SIZE / 2;
let ballY = HEIGHT / 2 - BALL_SIZE / 2;
let ballVX = BALL_SPEED * (Math.random() * 2 - 1);
let ballVY = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

// Move ball
function moveBall() {
    ballX += ballVX;
    ballY += ballVY;
}

// Move human paddle
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    humanPaddleX = clamp(mouseX - PADDLE_WIDTH / 2, 0, WIDTH - PADDLE_WIDTH);
});

// Draw game objects
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw middle line
    ctx.setLineDash([16, 18, 1]);
    ctx.strokeStyle = "#888";
    ctx.beginPath();
    ctx.moveTo(0, HEIGHT / 2);
    ctx.lineTo(WIDTH, HEIGHT / 2);
    ctx.stroke();

    // Draw Paddles
    ctx.fillStyle = "#fff";
    ctx.fillRect(humanPaddleX, HEIGHT - PADDLE_MARGIN - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
    // Paddle Bot
    ctx.fillRect(botPaddleX, PADDLE_MARGIN, PADDLE_WIDTH, PADDLE_HEIGHT);

    ctx.fillRect(ballX, ballY, BALL_SIZE, BALL_SIZE);
}

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();