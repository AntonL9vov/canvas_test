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
        kineticLoss: toZeroToOne(0.1)
    };

    const world = createWorld(worldConfig);

    new StaticLine({
        line: [{x: 0, y: 500}, {x: 500, y: 500}],
        world,
        lineWidth: 1,
        color: 'red',
        lineCap: 'round',
    })

    new StaticLine({
        line: [{x: 300, y: 400}, {x: 500, y: 400}],
        world,
        lineWidth: 1,
        color: 'red',
        lineCap: 'round',
    })

    new StaticLine({
        line: [{x: 0, y: 0}, {x: 500, y: 0}],
        world,
        lineWidth: 1,
        color: 'red',
        lineCap: 'round',
    })

    new StaticLine({
        line: [{x: 100, y: 0}, {x: 0, y: 500}],
        world,
        lineWidth: 1,
        color: 'red',
        lineCap: 'round',
    })

    new StaticLine({
        line: [{x: 500, y: 0}, {x: 500, y: 500}],
        world,
        lineWidth: 1,
        color: 'red',
        lineCap: 'round',
    })

    new Ball({
        center: {x: 100, y: 300},
        radius: 10,
        color: 'blue',
        world,
        velocity: new Vector({x: 0, y: 0}, {x: 1, y: 10}),
        acceleration: new Vector({x: 0, y: 0}, {x: 0, y: 0.05}),
    })
}

export const createWorld = (worldConfig: WorldConfig) => {
    const world = new World(worldConfig);

    world.startWorld();

    return world;
}
