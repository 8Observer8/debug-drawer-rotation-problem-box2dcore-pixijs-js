import * as PIXI from "pixi.js";

export default class DebugDrawer {

    constructor(stage, pixelsPerMeter) {
        this.lines = new PIXI.Graphics();
        stage.addChild(this.lines);
        this.pixelsPerMeter = pixelsPerMeter;

        this.translationX = 0;
        this.translationY = 0;
        this.angle = 0;
    }

    DrawSolidPolygon(vertices, vertexCount, color) {
        const c = new PIXI.Color([color.r, color.g, color.b]).toHex();
        this.lines.lineStyle(1, c, 1, 0.5, true);

        this.lines.moveTo((vertices[0].x + this.translationX) * this.pixelsPerMeter,
            (vertices[0].y + this.translationY) * this.pixelsPerMeter);
        this.lines.lineTo((vertices[1].x + this.translationX) * this.pixelsPerMeter,
            (vertices[1].y + this.translationY) * this.pixelsPerMeter);
        this.lines.lineTo((vertices[2].x + this.translationX) * this.pixelsPerMeter,
            (vertices[2].y + this.translationY) * this.pixelsPerMeter);
        this.lines.lineTo((vertices[3].x + this.translationX) * this.pixelsPerMeter,
            (vertices[3].y + this.translationY) * this.pixelsPerMeter);
        this.lines.lineTo((vertices[0].x + this.translationX) * this.pixelsPerMeter,
            (vertices[0].y + this.translationY) * this.pixelsPerMeter);

        this.lines.angle = this.angle;
    }

    clear() {
        this.lines.clear();
    }

    PushTransform(xf) {
        this.translationX = xf.p.x;
        this.translationY = xf.p.y;
        this.angle = xf.q.s * 180 / Math.PI;
    }

    PopTransform(xf) {}
    DrawPolygon(vertices, vertexCount, color) {}
    DrawCircle(center, radius, color) {}
    DrawSolidCircle(center, radius, axis, color) {}
    DrawSegment(p1, p2, color) {}
    DrawTransform(xf) {}
    DrawPoint(p, size, color) {}
}
