import { CanvasConfig, createCanvas } from "../bin/createCanvas";

export const ball = (config?: CanvasConfig) => {
  const canvas = createCanvas(config);

  drawBall(canvas);
};

const drawBall = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas context not available");
  }

  const ballObject = {
    x: 100,
    y: 100,
    radius: 20,
    color: "red",
    vx: 10,
    vy: 5,
    draw: function () {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fillStyle = ballObject.color;
      context.fill();
    },
  };

  const ballMovement = () => {
    context.fillStyle = "rgba(255, 255, 255, 0.9)";
    context.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas before r
    ballObject.x += ballObject.vx;
    ballObject.y += ballObject.vy;
    if (
      ballObject.x + ballObject.radius > canvas.width ||
      ballObject.x - ballObject.radius < 0
    ) {
      ballObject.vx = -ballObject.vx;
      ballObject.vy *= 0.99;
    }

    if (
      ballObject.y + ballObject.radius > canvas.height ||
      ballObject.y - ballObject.radius < 0
    ) {
      ballObject.vy = -ballObject.vy;
      ballObject.vy *= 0.99;
    }

    ballObject.draw();

    requestAnimationFrame(ballMovement);
  };

  ballMovement();
};
