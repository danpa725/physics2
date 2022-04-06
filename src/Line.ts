import { ParticlePlayer } from "./Manager";
import { pickRandomArrayValue } from "./utils/random";
import Vector from "./Vector";

const LINE_ACC = [0.005, 0.0075, 0.01, 0.0125, 0.015];
const LINE_LENGTH = [1, 2, 3, 4, 5];
const LINE_COLOR = ["#F6FFA4", "#FFF56D", "#FFD365"];
const LINE_WIDTH = [1, 1.2, 1.4, 1.6, 1.8, 2];

export { LINE_ACC, LINE_LENGTH, LINE_COLOR, LINE_WIDTH, INITIAL_VELOCITY };

const INITIAL_VELOCITY = {
    x: 1,
    y: 1.25,
};

class Line extends ParticlePlayer {
    protected position: Vector;
    protected acc: Vector;
    protected velocity: Vector;

    protected lineColor: string;
    protected lineLength: number;
    protected lineWidth: number;
    protected lineGradient;

    constructor(
        protected readonly ctx: CanvasRenderingContext2D,
        protected width: number,
        protected height: number
    ) {
        super(() => {});
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        const initialPosition = {
            x: -10 * pickRandomArrayValue(LINE_WIDTH) * 20,
            y: -10 * pickRandomArrayValue(LINE_WIDTH) * 20,
        };

        const initialAcc = {
            x: pickRandomArrayValue(LINE_ACC),
            y: pickRandomArrayValue(LINE_ACC),
        };

        this.position = new Vector(initialPosition);
        this.velocity = new Vector(INITIAL_VELOCITY);
        this.acc = new Vector(initialAcc);

        this.lineLength = pickRandomArrayValue(LINE_LENGTH);
        this.lineColor = pickRandomArrayValue(LINE_COLOR);
        this.lineWidth = pickRandomArrayValue(LINE_WIDTH);

        this.lineGradient = this.ctx.createLinearGradient(0, 0, width, height);
        this.lineGradient.addColorStop(0, "transparent");
        this.lineGradient.addColorStop(1, this.lineColor);
    }

    protected updateVelocity() {
        this.velocity.y += this.acc.y;
        this.velocity.x += this.acc.x;
    }
    protected updatePosition() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    protected updateLineProperty() {
        this.lineLength += 0.0075;
    }

    // public drawCircle() {
    //     this.updateVelocity();
    //     this.updatePosition();
    //     this.updateLineProperty();

    //     this.ctx.beginPath();
    //     this.velocity.x += this.acc.x / 100;

    //     this.ctx.arc(
    //         500,
    //         500,
    //         this.lineWidth * 125,
    //         this.position.x / 100,
    //         this.position.y / 100
    //     );

    //     this.ctx.stroke();
    //     this.setLineProperty();
    // }
}

export default Line;
