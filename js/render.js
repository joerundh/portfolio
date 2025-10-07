import { Header } from "./header.js";
import { ProgressBar } from "./progressbar.js";

const position = { y: 0, max: 20 };

const header = Header();
document.body.appendChild(header.component);

const progressBar = ProgressBar(position.max);
document.body.appendChild(progressBar.component);

window.addEventListener("wheel", e => {
    if (e.deltaY > 0) {
        if (position.y < position.max) {
            position.y = position.y + 1;
            if (position.y === 1) {
                header.setToMinimal();
            }
            progressBar.moveDown();
        }
    } else if (e.deltaY < 0) {
        if (position.y > 0) {
            position.y = position.y - 1;
            if (position.y === 0) {
                header.setToFull();
            }
            progressBar.moveUp();
        }
    }
})