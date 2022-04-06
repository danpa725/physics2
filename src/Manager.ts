import App, { AppConstructorProps } from "./App";

class ParticlePlayer {
    constructor(protected playFunction: () => void) {}

    public play = () => {
        this.playFunction();
    };
}

interface ParticleType {
    new (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    ): ParticlePlayer;
}

interface ManagerConstructorProps extends AppConstructorProps {
    Particle: ParticleType;
    particleNumber: number;
}
class Manager {
    private canvasApp: App;

    protected particleNumber: number;
    protected particleArray: ParticlePlayer[];
    protected requestAnimationID: null | number;

    constructor({
        Particle,
        particleNumber,
        ref,
        styleClassName,
    }: ManagerConstructorProps) {
        this.canvasApp = new App({
            ref,
            styleClassName,
        });

        this.requestAnimationID = null;

        this.particleNumber = particleNumber;
        this.particleArray = Array.from({ length: this.particleNumber }).map(
            (_) =>
                new Particle(
                    this.canvasApp.ctx,
                    this.canvasApp.width,
                    this.canvasApp.height
                )
        );
    }

    public setUp() {
        window.addEventListener("load", () => this.canvasApp.setCanvasSize());
        window.addEventListener("resize", () => this.canvasApp.setCanvasSize());
    }

    public playParticle = () => {
        this.requestAnimationID = requestAnimationFrame(this.playParticle);

        this.canvasApp.claerCanvas();
        for (let i = 0; i < this.particleNumber; i++) {
            this.particleArray[i].play();
        }
    };

    public stopParticle() {
        this.canvasApp.claerCanvas();
        this.canvasApp.ctx.font = "48px -apple-system, sans-serif";
        this.canvasApp.ctx.fillStyle = "#ffffff";
        this.canvasApp.ctx.fillText(
            "Animation ⛔️",
            this.canvasApp.width / 2 - 150,
            this.canvasApp.height / 2
        );

        cancelAnimationFrame(this.requestAnimationID!);
    }
}

export { Manager, ParticlePlayer };
