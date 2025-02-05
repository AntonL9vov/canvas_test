import {Coordinate} from "./obstacle.ts";

export const getLineFunction = (firstPoint: Coordinate, secondPoint: Coordinate) => {
    const m = (secondPoint.y - firstPoint.y) / (secondPoint.x - firstPoint.x);
    const c = firstPoint.y - m * firstPoint.x;
    return (x: number) => m * x + c;
}

export const getCircleFunction = (center: Coordinate, radius: number) => {
    return (x: number) => Math.sqrt(radius * radius - (x - center.x) * (x - center.x));
}

export const getLineAndCircleIntersection = (firstPoint: Coordinate, secondPoint: Coordinate, center: Coordinate, radius: number) => {
    const line = getLineFunction(firstPoint, secondPoint);
    const circle = getCircleFunction(center, radius);

    const x = (circle(secondPoint.x) - circle(firstPoint.x)) / (line(secondPoint.x) - line(firstPoint.x));
    const y = line(x);
    return {x, y};
}