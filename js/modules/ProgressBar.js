const ProgressBar = function(max, { r0, g0, b0 }, { r1, g1, b1 }) {
    let position = {
        current: 0,
        min: 0,
        max: max
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
        transition: width 200ms ease-in-out;
    `;
    const barCss = () => {
        const widthR = position.current/position.max;
        const widthPc= Math.round(100*widthR);
        const r = Math.round(r0 + (r1 - r0)*widthR);
        const g = Math.round(g0 + (g1 - g0)*widthR);
        const b = Math.round(b0 + (b1 - b0)*widthR);
        return `
            ${barBaseCss}
            background-image: linear-gradient(to right, rgb(${r0}, ${g0}, ${b0}), rgb(${r}, ${g}, ${b}));
            width: ${Math.round(100*position.current/position.max)}%;
        `;
    };

    container.appendChild(bar);

    const update = () => {
        bar.style = barCss();
    }

    const moveUp = () => {
        if (position.current > position.min) {
            position.current = position.current - 1;
            update();
        }
    }

    const moveDown = () => {
        if (position.current < position.max) {
            position.current = position.current + 1;
            update();
        }
    }

    update();

    return {
        component: container,
        moveUp,
        moveDown
    };
};

export { ProgressBar };