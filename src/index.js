import { b2BodyType, b2PolygonShape, b2Vec2, b2World, DrawShapes } from "@box2d/core";
import * as PIXI from "pixi.js";
import DebugDrawer from "./debug-drawer.js";

async function init() {
    const renderer = PIXI.autoDetectRenderer(300, 300, {
        backgroundColor: 0x000000,
        antialias: true,
        resolution: 1
    });
    renderer.view.width = 300;
    renderer.view.height = 300;
    document.body.appendChild(renderer.view);

    // Create the main stage for your display objects
    const stage = new PIXI.Container();

    const world = b2World.Create({ x: 0, y: 9.8 });
    const pixelsPerMeter = 30;
    const debugDrawer = new DebugDrawer(stage, pixelsPerMeter);

    // Box
    const boxShape = new b2PolygonShape();
    boxShape.SetAsBox(30 / pixelsPerMeter, 30 / pixelsPerMeter);
    const boxBody = world.CreateBody({
        type: b2BodyType.b2_dynamicBody,
        position: { x: 100 / pixelsPerMeter, y: 30 / pixelsPerMeter },
        angle: 30 * Math.PI / 180
    });
    boxBody.CreateFixture({ shape: boxShape, density: 1 });

    // Ground
    const groundShape = new b2PolygonShape();
    groundShape.SetAsBox(130 / pixelsPerMeter, 20 / pixelsPerMeter);
    const groundBody = world.CreateBody({
        type: b2BodyType.b2_staticBody,
        position: { x: 150 / pixelsPerMeter, y: 270 / pixelsPerMeter }
    });
    groundBody.CreateFixture({ shape: groundShape });

    let currentTime, lastTime, dt;

    function render() {
        requestAnimationFrame(render);

        currentTime = Date.now();
        dt = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        world.Step(dt, { velocityIterations: 3, positionIterations: 2 });
        DrawShapes(debugDrawer, world);

        // Render the stage
        renderer.render(stage);
        debugDrawer.clear();
    }

    lastTime = Date.now();
    render();
}

init();
