export type Coordinate = {
  x: number;
  y: number;
};

export type Obstacle = {
  lines: Coordinate[];
  color: string;
};

export const addObstacle = (obstacle: Obstacle, obstacles: Obstacle[]) => {
  const newObstacle = {
    ...obstacle,
  };

  obstacles.push(newObstacle);
};

const drawObstacle = (
  context: CanvasRenderingContext2D,
  obstacle: Obstacle
) => {
  context.beginPath();
  context.fillStyle = obstacle.color;
  context.moveTo(obstacle.lines[0].x, obstacle.lines[0].y);
  for (let i = 1; i < obstacle.lines.length; i++) {
    context.lineTo(obstacle.lines[i].x, obstacle.lines[i].y);
  }
  context.fill();
};

export const drawObstacles = (
  context: CanvasRenderingContext2D,
  obstacles: Obstacle[]
) => {
  obstacles.forEach((obstacle) => {
    drawObstacle(context, obstacle);
  });
};
