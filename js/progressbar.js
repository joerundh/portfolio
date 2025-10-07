const ProgressBar = function(ticks) {
    let pos = {
        current: 0,
        min: 0,
        max: ticks
    };

    const container = document.createElement("div");
    const containerCss = `
        height: 5px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        justify-content: start;
    `;
    container.style = containerCss;

    const bar = document.createElement("div");
    const barBaseCss = `
        width: 100%;
        background-image: linear-gradient(to right, yellow, red);
        transition: width 200ms ease-in-out;
        position: block;
    `;
    const barCss = () => `
        ${barBaseCss}
        width: ${Math.round(100*pos.current/pos.max)}%;
    `;

    container.appendChild(bar);

    const update = () => {
        bar.style = barCss();
    }

    const moveUp = () => {
        if (pos.current > pos.min) {
            pos.current = pos.current - 1;
            update();
        }
    }

    const moveDown = () => {
        if (pos.current < pos.max) {
            pos.current = pos.current + 1;
            update();
        }
    }

    return {
        component: container,
        moveUp,
        moveDown
    };
};

export { ProgressBar };