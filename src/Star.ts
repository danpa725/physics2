import Line, { INITIAL_VELOCITY, LINE_ACC, LINE_LENGTH, LINE_WIDTH } from "./Line";
import { PI } from "./utils/math";
import { pickRandomArrayValue } from "./utils/random";
const POSITIVE_DIREC = Array.from({ length: 15 }, (_, i) => (i + 1) * 0.25);
const NEGATIVE_DIREC = POSITIVE_DIREC.map((num) => -1 * num).sort((a, b) => a - b);
const DIREC_ARRAY = NEGATIVE_DIREC.concat(POSITIVE_DIREC);

class Star extends Line {
    constructor(
        protected readonly ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    ) {
        super(ctx, width, height);

        this.playFunction = this.drawStar;

        window.addEventListener("mousedown", this.seprateStar);
    }

    private reDraw() {
        if (this.position.x > this.width + 20) {
            this.lineLength = pickRandomArrayValue(LINE_LENGTH);

            this.position.x = -10 * pickRandomArrayValue(LINE_WIDTH) * 20;
            this.velocity.x = INITIAL_VELOCITY.x;
            this.acc.x = pickRandomArrayValue(LINE_ACC);
        }
        if (this.position.y > this.height + 20) {
            this.lineLength = pickRandomArrayValue(LINE_LENGTH);

            this.position.y = -10 * pickRandomArrayValue(LINE_WIDTH) * 20;
            this.velocity.y = INITIAL_VELOCITY.y;
            this.acc.y = pickRandomArrayValue(LINE_ACC);
        }
    }

    private setLineProperty() {
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.lineGradient;
        this.ctx.fillStyle = this.lineColor;
        this.ctx.shadowColor = this.lineColor;
        this.ctx.shadowBlur = 1;
    }

    private drawStar = () => {
        this.reDraw();

        this.updateVelocity();
        this.updatePosition();
        this.updateLineProperty();

        this.ctx.beginPath();

        this.ctx.moveTo(this.position.x, this.position.y);
        this.ctx.lineTo(
            this.position.x + this.velocity.x * this.lineLength,
            this.position.y + this.velocity.y * this.lineLength
        );

        this.ctx.arc(
            this.position.x + this.velocity.x * this.lineLength,
            this.position.y + this.velocity.y * this.lineLength,
            this.lineWidth * 1.05,
            0,
            PI * 2
        );

        this.ctx.stroke();

        this.setLineProperty();
    };

    private seprateStar = (e: MouseEvent) => {
        this.position.x = e.clientX;
        this.position.y = e.clientY;
        this.lineLength = pickRandomArrayValue(LINE_LENGTH) * 5;

        const direcX =
            (pickRandomArrayValue(DIREC_ARRAY) * pickRandomArrayValue(LINE_WIDTH)) /
            25;
        const direcY =
            (pickRandomArrayValue(DIREC_ARRAY) * pickRandomArrayValue(LINE_WIDTH)) /
            25;

        this.velocity.x = direcX;
        this.velocity.y = direcY;

        this.acc.x = direcX;
        this.acc.y = direcY;
    };
}

export default Star;
