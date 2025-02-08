import {CanvasConfig, createCanvas} from "../../bin/createCanvas.ts";
import {toZeroToOne, World, WorldConfig} from "./world.ts";
import {StaticLine} from "./objects/static/staticLine.ts";
import {Ball} from "./objects/moveable/ball.ts";
import {Vector} from "./utils/vectors.ts";

export const init = (config?: CanvasConfig) => {
    const canvas = createCanvas(config);

    const worldConfig: WorldConfig = {
        gravityForce: 10,
        staticObjects: [],
        moveableObjects: [],
        canvas,
        handlers: [],
        kineticLoss: toZeroToOne(0.3)
    };

    const world = createWorld(worldConfig);

    new StaticLine({
        line: [{x: 0, y: 700}, {x: 1200, y: 700}],
        world,
        lineWidth: 1,
        color: 'red',
        lineCap: 'round',
    })

    new StaticLine({
        line: [{x: 1100, y: 500}, {x: 1100, y: 600}],
        world,
        lineWidth: 1,
        color: 'red',
        lineCap: 'round',
    })

    new StaticLine({
        line: [{x: 1110, y: 500}, {x: 1110, y: 600}],
        world,
        lineWidth: 1,
        color: 'red',
        lineCap: 'round',
    })

    new StaticLine({
        line: [{x: 1100, y: 500}, {x: 1110, y: 500}],
        world,
        lineWidth: 1,
        color: 'red',
        lineCap: 'round',
    })

    new StaticLine({
        line: [{x: 1100, y: 600}, {x: 1200, y: 600}],
        world,
        lineWidth: 1,
        color: 'red',
        lineCap: 'round',
    })

    new StaticLine({
        line: [{x: 1100, y: 590}, {x: 1200, y: 590}],
        world,
        lineWidth: 1,
        color: 'red',
        lineCap: 'round',
    })

    new StaticLine({
        line: [{x: 0, y: 0}, {x: 1200, y: 0}],
        world,
        lineWidth: 1,
        color: 'red',
        lineCap: 'round',
    })

    new StaticLine({
        line: [{x: 0, y: 0}, {x: 0, y: 700}],
        world,
        lineWidth: 1,
        color: 'red',
        lineCap: 'round',
    })

    new StaticLine({
        line: [{x: 1200, y: 0}, {x: 1200, y: 700}],
        world,
        lineWidth: 1,
        color: 'red',
        lineCap: 'round',
    })


    let mouseDownRemember: MouseEvent | null = null;

    const onMouseDown = (event: MouseEvent) => {
        mouseDownRemember = event
    }

    const addNewBallCustomVelocity = (event: MouseEvent) => {
        new Ball({
            center: {x: event.x, y: event.y},
            radius: 10,
            color: 'blue',
            world,
            velocity: new Vector({x: 0, y: 0}, {
                x: (mouseDownRemember!.x - event.x) / 10,
                y: (mouseDownRemember!.y - event.y) / 10
            }),
            acceleration: new Vector({x: 0, y: 0}, {x: 0, y: 0.07}),
        })

        mouseDownRemember = null
    }


    const handler = {
        event: 'mousedown',
        handler: onMouseDown
    }

    const handler2 = {
        event: 'mouseup',
        handler: addNewBallCustomVelocity
    }

    world.addListeners([handler, handler2]);
}

export const createWorld = (worldConfig: WorldConfig) => {
    const world = new World(worldConfig);

    world.startWorld();

    return world;
}
