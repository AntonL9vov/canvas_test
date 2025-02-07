import {Point, WorldObject} from "../main.ts";
import {Vector} from "../../utils/vectors.ts";
import {StaticLine} from "../static/staticLine.ts";

export interface Moveable extends WorldObject {
    move: () => void;
    velocity: Vector;
    acceleration: Vector;
    center: Point;
    checkStaticCollisions: () => void;
    reflectLine: (line: StaticLine) => void;
    timeoutBetweenCollisions: number;
    timeoutBetweenCollisionsInProgress: boolean;
}