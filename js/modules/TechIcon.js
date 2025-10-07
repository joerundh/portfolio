const TechIcon = function(url, toggleOn, toggleOff) {
    let selected = false;

    const div = document.createElement("div");
    const divCss = `
        width: 30px;
        height: 36px;
        padding-top: 3px;
        border-radius: 3px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;

    const img = document.createElement("img");
    img.src = url;
    const baseCss = `
        cursor: pointer;
        transition: width 300ms ease-in-out, height 300ms ease-in-out;
    `;

    const imgPlainCss = () => `
        ${baseCss}
        width: 20px;
        height: 20px;
        margin: 5px;
    `;

    const imgHoverCss = () => `
        ${baseCss}
        width: 30px;
        height: 30px;
        margin: 0px;
    `;

    img.style = imgPlainCss();

    // Underline

    const underline = document.createElement("div");
    const underlineBaseCss = `
        height: 3px;
        transition: width 300ms ease-in-out;
        background-color: white;
    `;

    const underlineOnCss = () => `
        ${underlineBaseCss},
        width: 100%;
    `;

    const underlineOffCss = () => `
        ${underlineBaseCss}
        width: 0;
    `;

    underline.style = underlineOffCss();

    // Event listeners

    div.addEventListener("hover", e => {
        img.style = imgHoverCss();
    });
    div.addEventListener("mouseleave", e => {
        img.style = imgPlainCss();
    });
    div.addEventListener("click", e => {
        selected = !selected;
        if (selected) {
            underline.style = underlineOnCss();
            toggleOn();
        } else {
            underline.style = underlineOffCss();
            toggleOff();
        }
    });

    // Append and return

    div.appendChild(img);
    div.appendChild(underline)

    return { component: div };
}