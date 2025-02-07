import {Static} from "./objects/static/main.ts";
import {Moveable} from "./objects/moveable/main.ts";
import {Handler, listeners} from "./listeners.ts";

export interface World {
    gravityForce: number;
    staticObjects: Static[];
    moveableObjects: Moveable[];
    drawWorld: () => void;
    move: () => void;
    handlers: Handler[];
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    startWorld: (counterOfAnimation?: number) => void;
    addStaticObject: (...staticObjects: Static[]) => void;
    addMoveableObject: (...moveableObject: Moveable[]) => void;
    addListeners: (handlers: Handler[]) => void;
    kineticLoss: ZeroToOne
}

type ZeroToOne = number & { __brand: "ZeroToOne" };

export function toZeroToOne(value: number): ZeroToOne {
    if (value < 0 || value > 1) {
        throw new Error("Value must be between 0 and 1");
    }
    return value as ZeroToOne;
}

export type WorldConfig = Pick<World, "gravityForce" | "staticObjects" | "moveableObjects" | "canvas" | "handlers" | "kineticLoss">

export class World implements World {
    constructor(config: WorldConfig) {
        this.gravityForce = config.gravityForce;
        this.staticObjects = [];
        this.moveableObjects = [];
        this.canvas = config.canvas;
        const context = this.canvas.getContext("2d");
        if (!context) {
            throw new Error("Can not get 2D context");
        }
        this.context = context;
        this.kineticLoss = toZeroToOne(config.kineticLoss);

        this.addListeners(config.handlers);
        this.addStaticObject(...config.staticObjects);
        this.addMoveableObject(...config.moveableObjects);
    }

    addListeners = (handlers: Handler[]) => {
        listeners(this.canvas, handlers);
    }

    addStaticObject = (...staticObjects: Static[]) => {
        this.staticObjects.push(...staticObjects);
    }

    addMoveableObject = (...moveableObjects: Moveable[]) => {
        this.moveableObjects.push(...moveableObjects);
    }

    drawWorld = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.staticObjects.forEach((staticObject) => {
            staticObject.draw();
        });
        this.moveableObjects.forEach((moveable) => {
            moveable.draw();
        });
    }

    move = () => {
        this.moveableObjects.forEach((moveable) => {
            moveable.move();
        });
    }

    startWorld = (counterOfAnimation?: number) => {
        this.move();
        this.drawWorld();

        if (counterOfAnimation === 0)
            return;

        // console.log(this.moveableObjects);

        requestAnimationFrame(() => this.startWorld(counterOfAnimation ? counterOfAnimation - 1 : undefined));
    }
}