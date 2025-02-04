export type Ball = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  color: string;
};

export const createBall = (config: Ball) => {
  const ball: Ball = {
    ...config,
  };

  return ball;
};

export const addBall = (context: CanvasRenderingContext2D, config: Ball) => {
  const ball = createBall(config);

  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  context.fillStyle = ball.color;
  context.fill();

  return ball;
};
