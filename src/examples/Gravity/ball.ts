import { Obstacle } from "./obstacle";

export type Ball = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  color: string;
};

export const addBall = (balls: Ball[], config: Ball) => {
  const ball: Ball = {
    ...config,
  };

  balls.push(ball);

  return ball;
};

const drawBall = (
  context: CanvasRenderingContext2D,
  ball: Ball,
  obstacles: Obstacle[]
) => {
  context.beginPath();
  const bottom = ball.y + ball.radius;
  const right = ball.x + ball.radius;
  const left = ball.x - ball.radius;
  const top = ball.y - ball.radius;

  if (bottom > context.canvas.height - ball.dy) {
    ball.dy = 0;
    ball.y = context.canvas.height - ball.radius;
  }
  if (top < ball.dy) {
    ball.dy = 0;
    ball.y = ball.radius;
  }
  if (right > context.canvas.width - ball.dx) {
    ball.dx = -ball.dx;
    ball.x = context.canvas.width - ball.radius;
  }
  if (left < ball.dx) {
    ball.dx = -ball.dx;
    ball.x = ball.radius;
  }

  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  context.fillStyle = ball.color;
  context.fill();
};

export const drawBalls = (
  context: CanvasRenderingContext2D,
  balls: Ball[],
  obstacles: Obstacle[]
) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  balls.forEach((ball) => {
    drawBall(context, ball, obstacles);
  });
};
