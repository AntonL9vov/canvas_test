import {Point} from "../main.ts";
import {Static} from "./main.ts";
import {Vector} from "../../utils/vectors.ts";

export interface StaticLine extends Static {
    line: [Point, Point];
    lineWidth: number;
    lineCap: CanvasLineCap;
    getNormal: () => Vector;
    firstPoint: Point;
    secondPoint: Point;
    toVector: () => Vector;
}

export type StaticLineConfig = Pick<StaticLine, "line" | "world" | "lineWidth" | "color" | "lineCap">

export class StaticLine implements StaticLine {
    constructor(config: StaticLineConfig) {
        this.line = config.line;
        this.world = config.world;
        this.lineWidth = config.lineWidth;
        this.color = config.color;
        this.lineCap = config.lineCap;
        this.firstPoint = this.line[0];
        this.secondPoint = this.line[1];

        this.world.addStaticObject(this);
    }

    draw() {
        const [firstPoint, secondPoint] = this.line;

        const context = this.world.context;

        context.save();
        context.beginPath();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.color;
        context.lineCap = this.lineCap;
        context.moveTo(firstPoint.x, firstPoint.y);
        context.lineTo(secondPoint.x, secondPoint.y);
        context.stroke();
        context.restore();
    }

    toLines(): StaticLine[] {
        return [this];
    }

    toVector = () => {
        return new Vector(this.firstPoint, this.secondPoint)
    }

    getNormal = () => {
        const dx = this.secondPoint.x - this.firstPoint.x;
        const dy = this.secondPoint.y - this.firstPoint.y;

        // Нормаль (перпендикулярный вектор)
        const nx = -dy;
        const ny = dx;
        const length = Math.sqrt(nx * nx + ny * ny);
        return new Vector({x: 0, y: 0}, {x: nx / length, y: ny / length});
    }
}