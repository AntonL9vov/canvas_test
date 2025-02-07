import {
    getDistanceBetweenLineAndPoint,
} from "../../utils/math";
import {Moveable} from "./main.ts";
import {StaticLine} from "../static/staticLine.ts";

export interface Ball extends Moveable {
    radius: number
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

        console.log("here")

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
}