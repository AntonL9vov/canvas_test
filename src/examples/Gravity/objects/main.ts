import {World} from "../world.ts";

export interface WorldObject {
    draw: () => void;
    world: World;
    color: string;
}

export interface Point {
    x: number
    y: number
}
