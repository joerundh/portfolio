import { Header } from "./modules/Header.js";
import { ProgressBar } from "./modules/ProgressBar.js";
import { ScrollController } from "./modules/ScrollController.js";

const position = { y: 0, max: 20 };

const header = Header();
document.body.appendChild(header.component);

const progressBar = ProgressBar(position.max, { r0: 255, g0: 0, b0: 0 }, { r1: 255, g1: 255, b1: 0 });
document.body.appendChild(progressBar.component);

window.addEventListener("wheel", ScrollController(position.max, {
    moveUp: progressBar.moveUp,
    moveDown: progressBar.moveDown,
    leaveTop: header.setToMinimal,
    reachTop: header.setToFull
}
));