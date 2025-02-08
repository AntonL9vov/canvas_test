import {Point} from "../objects/main.ts";

export interface Vector {
    start: Point;
    end: Point;
    add: (vector: Vector) => Vector;
    toZero: () => Vector;
    getNormal: () => Vector;
    scalarProduct: (v: Vector) => number;
    scale: (scale: number) => Vector;
    reverse: () => Vector;
    tangentComponent: (v: Vector) => Vector;
    getMagnitude: () => number;
}

export class Vector implements Vector {
    constructor(start: Point, end: Point) {
        this.start = start;
        this.end = end;
    }

    add = (vector: Vector) => {
        const startX = this.start.x + vector.start.x;
        const startY = this.start.y + vector.start.y;

        const endX = this.end.x + vector.end.x;
        const endY = this.end.y + vector.end.y;

        return new Vector({x: startX, y: startY}, {x: endX, y: endY});
    }

    toZero = () => {
        const startX = 0;
        const startY = 0;

        const endX = 0;
        const endY = 0;

        return new Vector({x: startX, y: startY}, {x: endX, y: endY});
    }

    getMagnitude = () => {
        return Math.sqrt((this.end.x - this.start.x) ** 2 + (this.end.y - this.start.y) ** 2);
    }

    getNormal = () => {
        const mag = this.getMagnitude();
        return new Vector(this.start, {x: this.end.x / mag, y: this.end.y / mag});
    }

    scalarProduct = (v: Vector) => {
        return this.end.x * v.end.x + this.end.y * v.end.y;
    }

    scale = (scale: number) => {
        const startX = this.start.x * scale;
        const startY = this.start.y * scale;

        const endX = this.end.x * scale;
        const endY = this.end.y * scale;

        return new Vector({x: startX, y: startY}, {x: endX, y: endY});
    }

    reverse = () => {
        return new Vector(this.start, this.end).scale(-1);
    }

    tangentComponent = (v: Vector) => {
        return new Vector({
            x: this.start.x - v.start.x,
            y: this.start.y - v.start.y
        }, {
            x: this.end.x - v.end.x,
            y: this.end.y - v.end.y
        });
    }
}