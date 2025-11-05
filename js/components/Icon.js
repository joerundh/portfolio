const Icon = function({
    src,
    size = 50,
    alt = "Icon",
    setEnabled = false,
    setSelected = false,
    selectCallback = () => {},
    unselectCallback = () => {},
    hoverCallback = () => {},
    leaveCallback = () => {},
    clickCallback = () => {}
}) {
    // Properties

    let enabled = setEnabled;
    let selected = setSelected;
    let hovering = false;

    const lineHeight = Math.ceil(0.1*size);

    // Main element

    const div = document.createElement("div");
    const divBaseStyle = () => `
        width: ${size}px;
        height: ${size + 2*lineHeight}px;
        padding-top: ${lineHeight}px;
        cursor: ${enabled ? "pointer" : "default" };
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        gap: 0;
        user-select: none;
    `;
    div.style = divBaseStyle();

        // Image

        const imgContainer = document.createElement("div");
        const imgContainerStyle = `
            width: 100%;
            height: ${size}px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        `;
        imgContainer.style = imgContainerStyle;

        const img = document.createElement("img");
        img.src = src;
        img.alt = alt;
        const imgBaseStyle = `
            transition: width 150ms ease-in-out, height 150ms ease-in-out;
        `;

        const imgDefaultStyle = () => `
            ${imgBaseStyle}
            width: 80%;
            height: 80%;
        `;

        const imgHoverStyle = () => `
            ${imgBaseStyle}
            width: 100%;
            height: 100%;
        `;

        img.style = imgDefaultStyle();

        imgContainer.appendChild(img);

        // Underline

        const underline = document.createElement("div");
        const underlineBaseStyle = `
            background-color: #e0e0e0;
            height: ${lineHeight}px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            transition: width 150ms ease-in-out;
        `;

        const underlineStyle = () => `
            ${underlineBaseStyle}
            width: ${enabled && selected ? "100%" : "0"};
        `;

        underline.style = underlineStyle();
    
    div.appendChild(imgContainer);
    div.appendChild(underline);

    // Visuals

    const takeBreath = () => {
        img.style = imgHoverStyle();
        setTimeout(() => {
            img.style = imgDefaultStyle();
        }, 150);
    }

    const flashLine = () => {
        if (!selected) {
            underline.style.width = "100%";
            setTimeout(() => {
                underline.style.width = "0";
            }, 150);
        }
    }

    const doBoth = () => {
        takeBreath();
        setTimeout(flashLine, 150);
    }
    
    // Enabler and disabler

    const enable = () => {
        enabled = true;
        div.style.cursor = "pointer";
        if (selected) {
            img.style = imgDefaultStyle();
            underline.style.width = "100%";
        } else {
            flashLine();
        }
    };

    const disable = () => {
        enabled = false;
        div.style.cursor = "default";
        underline.style.width = "0";
    };

    // Toggle selected

    const toggle = () => {
        if (enabled) {
            selected = !selected;
            underline.style = underlineStyle();
            setTimeout(() => {
                if (selected) {
                    selectCallback();
                } else {
                    unselectCallback()
                }
            });
        }
    }

    // Event listeners

    div.addEventListener("mouseenter", e => {
        hovering = true;
        hoverCallback();
        if (enabled) {
            img.style = imgHoverStyle();
        }
    });

    div.addEventListener("mouseleave", e => {
        hovering = false;
        leaveCallback();
        if (enabled) {
            img.style = imgDefaultStyle();
        }
    });

    div.addEventListener("click", () => {
        toggle();
        clickCallback();
        if (selected) {
            selectCallback();
        } else {
            unselectCallback();
        }
    });

    // Return

    return {
        element: div,
        enable,
        disable,
        takeBreath,
        flashLine,
        doBoth
    };
}

export default Icon;