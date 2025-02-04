import { CanvasConfig, createCanvas } from "../../bin/createCanvas";

export const gravity = (config?: CanvasConfig) => {
  const canvas = createCanvas(config);

  drawGravity(canvas);

  const removeEventListener = initListeners(canvas);
};

const initListeners = (canvas: HTMLCanvasElement) => {
  // const addBallWithCanvas = (event: MouseEvent) => addBall(event, canvas);
  // canvas.addEventListener("click", addBallWithCanvas);
  // const deleteListener = () =>
  //   canvas.removeEventListener("click", addBallWithCanvas);
  // return deleteListener;
};

const drawGravity = (canvas: HTMLCanvasElement) => {};
