const TechIcon = function(url, toggleOn = () => {}, toggleOff = () => {}) {
    let selected = false;

    // Image

    const div = document.createElement("div");
    const divCss = `
        width: 40px;
        height: 46px;
        padding-top: 3px;
        border-radius: 3px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;
    div.style = divCss;

    const img = document.createElement("img");
    img.src = url;
    const imgBaseCss = `
        cursor: pointer;
        transition: width 150ms ease-in-out, height 150ms ease-in-out, margin 150ms ease-in-out;
    `;

    const imgPlainCss = () => `
        ${imgBaseCss}
        width: 30px;
        height: 30px;
        margin: 5px;
    `;

    const imgHoverCss = () => `
        ${imgBaseCss}
        width: 40px;
        height: 40px;
        margin: 0;
    `;

    img.style = imgPlainCss();

    // Toggle underline

    const underline = document.createElement("div");
    const underlineBaseCss = `
        height: 3px;
        background-color: #d0d0d0;
        transition: width 200ms ease-in;
    `;

    const underlineOnCss = () => `
        ${underlineBaseCss}
        width: 40px;
    `;

    const underlineOffCss = () => `
        ${underlineBaseCss}
        width: 0;
    `;

    underline.style = underlineOffCss();

    // Event listeners

    div.addEventListener("mouseenter", e => {
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

export { TechIcon };