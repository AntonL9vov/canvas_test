import { CanvasConfig, createCanvas } from "../../bin/createCanvas";
import { addBall, Ball } from "./ball";
import { addListeners, Handler } from "./listeners";

export const gravity = (config?: CanvasConfig) => {
  const canvas = createCanvas(config);

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Can not get 2D context");
  }

  drawGravity(canvas);

  const balls: Ball[] = [];

  const standartBall: Ball = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
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

    const ball = addBall(context, config);

    balls.push(ball);
  };

  handlers.push({
    handler: addBallHandler,
    event: "click",
  });

  const removeEventListeners = addListeners(canvas, handlers);
};

const drawGravity = (canvas: HTMLCanvasElement) => {};
