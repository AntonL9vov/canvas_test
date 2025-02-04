import { CanvasConfig, createCanvas } from "../../bin/createCanvas";
import { addBall, Ball, drawBalls } from "./ball";
import { addListeners, Handler } from "./listeners";

export const gravity = (config?: CanvasConfig) => {
  const canvas = createCanvas(config);

  const balls: Ball[] = [];
  const gravityForce = 10;

  drawGravity(canvas, balls, gravityForce);
};

const drawGravity = (
  canvas: HTMLCanvasElement,
  balls: Ball[],
  gravityForce: number
) => {
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Can not get 2D context");
  }

  gravityAnimation(context, balls);

  const standartBall: Ball = {
    x: 0,
    y: 0,
    dx: 0,
    dy: gravityForce,
    radius: 10,
    color: "red",
  };

  const handlers: Handler[] = [];

  const addBallHandler = (event: MouseEvent) => {
    const config: Ball = {
      ...standartBall,
      x: event.clientX - standartBall.radius,
      y: event.clientY - standartBall.radius,
    };

    addBall(balls, config);
  };

  handlers.push({
    handler: addBallHandler,
    event: "click",
  });

  const removeEventListeners = addListeners(canvas, handlers);
};

const gravityAnimation = (context: CanvasRenderingContext2D, balls: Ball[]) => {
  balls.forEach((ball) => {
    ball.x += ball.dx;
    ball.y += ball.dy;
  });

  drawBalls(context, balls);

  requestAnimationFrame(() => gravityAnimation(context, balls));
};
