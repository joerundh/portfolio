import Simplex from "../modules/Simplex.js";

const ProgressBar = function({
    init = 0,                                           // 0 | 1 | 2 | .. | max
    max = 1,                                            // 0 | 1 | 2 | ..
    direction = "horizontal",                           // "horizontal" | "vertical"
    position = "top",                                   // "top" | "bottom" | "left" | "right"
    width = 3,                                          // [px]
    startColor: { r1 = 255, g1 = 0, b1 = 0 } = {},      // { [0..255], [0..255], [0..255] }
    endColor: { r2 = r1, g2 = g1, b2 = b1 } = {}        // { [0..255], [0..255], [0..255] }
} = {}) {
    if (Math.floor(max) !== max || max < 0) {
        throw new Error("The maximum value must be a non-negative integer.");
    }
    if (Math.floor(init) !== init || init < 0 || init > max) {
        throw new Error("The initial value must be a non-negative integer no greater than the maximum value.")
    }
    if (![ "horizontal", "vertical" ].includes(direction)) {
        throw new Error("Direction must be either \"horizontal\" or \"vertical\"");
    }
    if (![ "top", "bottom", "left", "right" ].includes(position)) {
        throw new Error("Position must either be \"top\", \"bottom\", \"left\", or \"right\".");
    }
    if (direction === "horizontal") {
        if (![ "top", "bottom" ].includes(position)) {
            throw new Error("A horizontal bar must be placed either at the top or at the bottom.");
        }
    } else {
        if (![ "left", "right" ].includes(position)) {
            throw new Error("A vertical bar must be placed either on the left or on the right size.");
        }
    }

    const current = Simplex({ intitial: init });

    const ratio = () => current.value/max;

    const div = document.createElement("div");
    div.style = `
        position: absolute;
        width: ${direction === "horizontal" ? "100%" : width + "px" };
        height: ${direction === "vertical" ? "100%" : width + "px" };
        ${
            direction === "horizontal" ?
                position === "top" ?
                    "top: 0"
                :
                    "bottom: 0"
            :
                position === "left" ?
                    "left: 0"
                :
                    "right: 0"
        };
        display: flex;
        flex-direction: ${direction === "horizontal" ? "row" : "column"};
        justify-items: start;
    `;

    const bar = document.createElement("div");
    const barStyle = () => `
        width: ${direction === "horizontal" ? Math.round(100*ratio()) + "%" : "100%"};
        height: ${direction === "vertical" ? Math.round(100*ratio()) + "%" : "100%"};
        transition: width ease-in-out 200ms, height ease-in-out 200ms;
        background-image: linear-gradient(
                                ${direction === "horizontal" ? "to right" : "to bottom"},
                                rgb(${r1}, ${g1}, ${b1}),
                                rgb(${r1 + Math.round((r2 - r1)*ratio())}, ${g1 + Math.round((g2 - g1)*ratio())}, ${b1 + Math.round(b2 - b1)*ratio()}));
    `;

    div.appendChild(bar);

    current.onSet = () => {
        if (current.value < 0) current.value = 0;
        else if (current.value > max) current.value = max;
        else bar.style = barStyle();
    }
    
    div.addEventListener("resize", () => {
        bar.style = barStyle();
    });

    return new Proxy({}, {
        get(target, prop, receiver) {
            if (prop === "element") return div;
        },
        set(target, prop, value, receiver) {
            if (prop === "current") {
                if (typeof value === "number") {
                    if (value < 0) current.value = 0;
                    else if (value > max) current.value = max;
                    else current.value = value;
                }
                return true;
            }
            if (prop === "max") {
                if (typeof value === "number" && value <= 0) {
                    max = value;
                    if (current.value > max) current.value = value;
                }
            }
            return true;
        }
    });
};

export default ProgressBar;