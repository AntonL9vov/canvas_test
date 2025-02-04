import { CanvasConfig, createCanvas } from "../bin/createCanvas";

export const clock = (config?: CanvasConfig) => {
  const canvas = createCanvas(config);

  drawClock(canvas);
};

const drawClock = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Can not get 2D context");
  }

  const width = canvas.width;
  const height = canvas.height;

  if (width !== height) {
    throw new Error(
      "Canvas width and height for clock animation must be equal"
    );
  }

  const gap = 5;

  const radius = height / 2 - gap;

  const linesWidth = width / 100;
  const secondsWidth = width / 200;

  context.save();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(width / 2, height / 2, radius, 0, Math.PI * 2, true);
  context.fillStyle = "black";
  context.stroke();

  context.save();
  context.translate(width / 2, height / 2);
  for (var i = 0; i < 12; i++) {
    context.beginPath();
    context.rotate(Math.PI / 6);
    context.lineWidth = linesWidth;
    context.lineCap = "round";
    const lineLength = 10 * gap;
    context.moveTo(width / 2 - 2 * gap, 0);
    context.lineTo(height / 2 - lineLength, 0);
    context.stroke();
  }
  context.restore();

  context.save();
  context.translate(width / 2, height / 2);
  for (var i = 0; i < 60; i++) {
    context.beginPath();
    context.rotate(Math.PI / 30);
    context.lineWidth = secondsWidth;
    context.lineCap = "round";
    const lineLength = 5 * gap;
    context.moveTo(width / 2 - 2 * gap, 0);
    context.lineTo(height / 2 - lineLength, 0);
    context.stroke();
  }
  context.restore();

  const now = new Date();
  let hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  hour = hour >= 12 ? hour - 12 : hour;

  context.save();
  context.translate(width / 2, height / 2);

  context.beginPath();
  context.rotate(second * (Math.PI / 30));
  context.moveTo(0, 0);
  context.lineTo(0, -radius + 2 * gap);
  context.lineCap = "round";
  context.strokeStyle = "red";
  context.stroke();
  context.restore();

  context.save();
  context.translate(width / 2, height / 2);

  context.beginPath();
  context.rotate(minute * (Math.PI / 30) + (Math.PI / 1800) * second);
  context.moveTo(0, 0);
  context.lineTo(0, -radius + 20 * gap);
  context.lineWidth = 3;
  context.lineCap = "round";
  context.stroke();
  context.restore();

  context.save();
  context.translate(width / 2, height / 2);

  context.beginPath();
  context.rotate(
    hour * (Math.PI / 6) + (Math.PI / 360) * minute + (Math.PI / 21600) * second
  );
  context.moveTo(0, 0);
  context.lineTo(0, -radius + 30 * gap);
  context.lineWidth = 7;
  context.lineCap = "round";
  context.stroke();
  context.restore();
  window.requestAnimationFrame(() => drawClock(canvas));
};
