import {Coordinate} from "../objects/static/obstacle.ts";

export const getLineFunctionParams = (
    firstPoint: Coordinate,
    secondPoint: Coordinate
): [number, number, (x: number) => number] => {
    const m = (secondPoint.y - firstPoint.y) / (secondPoint.x - firstPoint.x);
    const c = firstPoint.y - m * firstPoint.x;
    return [m, c, (x: number) => m * x + c];
};

export const getDistanceBetweenLineAndPoint = (
    firstPoint: Coordinate,
    secondPoint: Coordinate,
    point: Coordinate
): number => {
    const [m, c] = getLineFunctionParams(firstPoint, secondPoint);

    if (!Number.isFinite(m)) {
        return Math.abs(point.x - firstPoint.x);
    }

    const distance = Math.abs(m * point.x - point.y + c) / Math.sqrt(m * m + 1);

    return distance;
};

export const getDistanceBetweenTwoPoints = (
    firstPoint: Coordinate,
    secondPoint: Coordinate
) => {
    return Math.sqrt(
        (firstPoint.x - secondPoint.x) * (firstPoint.x - secondPoint.x) +
        (firstPoint.y - secondPoint.y) * (firstPoint.y - secondPoint.y)
    );
}

export const getLineAndCircleIntersection = (
    firstPoint: Coordinate,
    secondPoint: Coordinate,
    center: Coordinate,
    radius: number
) => {
    const [m, c, lineFunction] = getLineFunctionParams(firstPoint, secondPoint);

    let resultOfQuadraticEquation = solveQuadraticEquestion(
        m * m + 1,
        2 * m * c - 2 * center.x,
        c * c - radius * radius
    );

    console.log(resultOfQuadraticEquation, m, c);

    resultOfQuadraticEquation = resultOfQuadraticEquation.filter(
        (x) => m * x + c >= 0 && x >= firstPoint.x && x <= secondPoint.x
    );

    console.log(resultOfQuadraticEquation);

    const pointsOfIntersection = resultOfQuadraticEquation.map((x) => ({
        x,
        y: lineFunction(x),
    }));

    return pointsOfIntersection;
};

const getDiscriminant = (a: number, b: number, c: number) => {
    return b * b - 4 * a * c;
};

export const solveQuadraticEquestion = (a: number, b: number, c: number) => {
    console.log(a, b, c);
    if (a === 0) {
        if (b === 0) {
            return [];
        }
        console.log(c, b);
        return [-c / b];
    }

    const discriminant = getDiscriminant(a, b, c);

    if (discriminant > 0) {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return [x1, x2];
    }
    return [];
};
