import "./styles/main.css";

import { Manager } from "./Manager";
import Star from "./Star";

const starManager = new Manager({
    Particle: Star,
    particleNumber: 75,
    ref: document.body,
    styleClassName: "star-canvas",
});
starManager.setUp();

//* activate btn
const playBtn = document.getElementById("play") as HTMLElement;
playBtn.addEventListener("click", () => {
    starManager.playParticle();
});

//* disable btn
const stopBtn = document.getElementById("stop") as HTMLElement;
stopBtn.addEventListener("click", () => {
    starManager.stopParticle();
});
