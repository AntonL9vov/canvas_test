import {CanvasConfig, createCanvas} from "../../bin/createCanvas";
import {addBall, Ball, drawBalls} from "./ball";
import {addListeners, Handler} from "./listeners";
import {drawObstacles, Obstacle} from "./obstacle";
import {getLineAndCircleIntersection} from "./math.ts";

export const gravity = (config?: CanvasConfig) => {
    const canvas = createCanvas(config);

    const balls: Ball[] = [];
    const gravityForce = 10;

    const obstacle: Obstacle = {
        lines: [
            {x: 100, y: 500},
            {x: 100, y: 400},
            {x: 300, y: 400},
            {x: 300, y: 300},
            {x: 400, y: 300},
            {x: 400, y: 500},
        ],
        color: "black",
    };

    const obstacles = [obstacle];

    drawGravity(canvas, balls, gravityForce, obstacles);

    console.log(getLineAndCircleIntersection({x: 2, y: 4}, {x: 3, y: 4}, {x: 4, y: 3}, 1))
};

const drawGravity = (
    canvas: HTMLCanvasElement,
    balls: Ball[],
    gravityForce: number,
    obstacles: Obstacle[] = []
) => {
    const context = canvas.getContext("2d");

    if (!context) {
        throw new Error("Can not get 2D context");
    }

    drawObstacles(context, obstacles);

    gravityAnimation(context, balls, obstacles);

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

const gravityAnimation = (
    context: CanvasRenderingContext2D,
    balls: Ball[],
    obstacles: Obstacle[]
) => {
    balls.forEach((ball) => {
        ball.x += ball.dx;
        ball.y += ball.dy;
    });

    drawBalls(context, balls, obstacles);
    drawObstacles(context, obstacles);

    requestAnimationFrame(() => gravityAnimation(context, balls, obstacles));
};
