import { UUID } from "uuidjs";

type BaseCanvasConfig = {
  canvasId: string;
  width: number;
  height: number;
  parentElement: HTMLElement | string;
};

export type CanvasConfig = Partial<BaseCanvasConfig>;

export const createCanvas = (config?: CanvasConfig) => {
  let parentElement: HTMLElement = document.body;
  if (typeof config?.parentElement === "string") {
    parentElement = document.getElementById(
      config.parentElement
    ) as HTMLElement;

    if (!parentElement) {
      throw new Error("Parent element not found");
    }
  } else if (config?.parentElement instanceof HTMLElement) {
    parentElement = config.parentElement;
  }

  const canvas = document.createElement("canvas");
  canvas.id = config?.canvasId ?? `canvas-${UUID.generate()}`;
  canvas.width = config?.width ?? 500;
  canvas.height = config?.height ?? 500;

  parentElement.appendChild(canvas);

  return canvas;
};
