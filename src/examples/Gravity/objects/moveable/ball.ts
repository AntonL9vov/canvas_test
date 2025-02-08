import {
    getDistanceBetweenLineAndPoint, getDistanceBetweenTwoPoints,
} from "../../utils/math";
import {Moveable} from "./main.ts";
import {StaticLine} from "../static/staticLine.ts";
import {UUID} from "uuidjs";

export interface Ball extends Moveable {
}

export type BallConfig = Pick<Ball, "center" | "radius" | "world" | "color" | "velocity" | "acceleration">

export class Ball implements Ball {
    constructor(config: BallConfig) {
        this.center = config.center;
        this.radius = config.radius;
        this.world = config.world;
        this.color = config.color;
        this.velocity = config.velocity;
        this.acceleration = config.acceleration;
        this.timeoutBetweenCollisions = 10;
        this.timeoutBetweenCollisionsInProgress = false;
        this.velocity.start = {x: 0, y: 0};
        this.acceleration.start = {x: 0, y: 0};

        this.uuid = UUID.generate();

        this.world.addMoveableObject(this);
    }

    draw() {
        const context = this.world.context;

        context.save();
        context.beginPath();
        context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.restore();
    }

    move() {
        this.checkStaticCollisions();
        this.checkMoveableCollisions()
        this.center.x += this.velocity.end.x;
        this.center.y += this.velocity.end.y;

        this.velocity = this.velocity.add(this.acceleration);
    }

    reflectLine(line: StaticLine) {
        const normal = line.getNormal();
        const scalar = this.velocity.scalarProduct(normal);

        const vNormal = normal.scale(scalar);

        const vTangent = this.velocity.tangentComponent(vNormal);

        const vNormalReversed = vNormal.reverse();

        this.velocity = vTangent.add(vNormalReversed).scale(1 - this.world.kineticLoss);
    }

    checkStaticCollisions() {
        // const context = this.world.context;
        if (this.timeoutBetweenCollisionsInProgress)
            return;
        this.world.staticObjects.forEach((staticObject) => {
            staticObject.toLines().forEach((line) => {
                const firstPoint = line.line[0];
                const secondPoint = line.line[1];

                const minX = Math.min(firstPoint.x, secondPoint.x);
                const maxX = Math.max(firstPoint.x, secondPoint.x);

                if ((this.center.x < minX || this.center.x > maxX) && minX !== maxX) {
                    return;
                }

                if (minX === maxX && (this.center.y < Math.min(firstPoint.y, secondPoint.y) || this.center.y > Math.max(firstPoint.y, secondPoint.y))) {
                    return;
                }

                if (getDistanceBetweenLineAndPoint(firstPoint, secondPoint, this.center) < this.radius) {
                    this.reflectLine(line)
                    this.timeoutBetweenCollisionsInProgress = true;
                    setTimeout(() => {
                        this.timeoutBetweenCollisionsInProgress = false
                    }, this.timeoutBetweenCollisions)
                    // this.acceleration.toZero();
                    // this.velocity.toZero();
                }
            })
        })
    }

    reflectBalls(ball: Ball) {
        const deltaX = ball.center.x - this.center.x;
        const deltaY = ball.center.y - this.center.y;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        if (distance === 0) return; // Защита от деления на ноль
        const nx = deltaX / distance;
        const ny = deltaY / distance;

        // Получаем компоненты скоростей
        const v1x = this.velocity.end.x - this.velocity.start.x;
        const v1y = this.velocity.end.y - this.velocity.start.y;
        const v2x = ball.velocity.end.x - ball.velocity.start.x;
        const v2y = ball.velocity.end.y - ball.velocity.start.y;

        // Нормальные составляющие
        const v1n = v1x * nx + v1y * ny;
        const v2n = v2x * nx + v2y * ny;

        // Тангенциальные составляющие
        const v1t = v1x * (-ny) + v1y * nx;
        const v2t = v2x * (-ny) + v2y * nx;

        // Обновляем нормальные составляющие (для одинаковых масс)
        const newV1n = v2n;
        const newV2n = v1n;

        // Собираем новые скорости
        const newV1x = newV1n * nx - v1t * ny;
        const newV1y = newV1n * ny + v1t * nx;
        const newV2x = newV2n * nx - v2t * ny;
        const newV2y = newV2n * ny + v2t * nx;

        // Обновляем векторы скоростей
        this.velocity.end = {x: newV1x, y: newV1y};
        ball.velocity.end = {x: newV2x, y: newV2y};

        // Корректируем позиции
        const overlap = this.radius + ball.radius - distance;
        if (overlap > 0) {
            const adjustX = (overlap / 2) * nx;
            const adjustY = (overlap / 2) * ny;
            this.center.x -= adjustX;
            this.center.y -= adjustY;
            ball.center.x += adjustX;
            ball.center.y += adjustY;
        }
    }

    checkMoveableCollisions() {
        this.world.moveableObjects.forEach((moveableObject) => {
            if (this.uuid === moveableObject.uuid)
                return;
            if (getDistanceBetweenTwoPoints(moveableObject.center, this.center) < this.radius + moveableObject.radius) {
                this.reflectBalls(moveableObject);
                // moveableObject.velocity = moveableObject.velocity.toZero();
                // this.velocity = this.velocity.toZero();
            }
        })
    }
}