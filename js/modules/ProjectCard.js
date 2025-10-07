const ProjectCard = function(project) {
    const card = document.createElementById("div");

    const baseCss = `
        width: 300px;
        heigth: 200px;
        border-radius: 5px;
        box-shadow: 5px 5px black;
        cursor: pointer;
    `;

    const plainCss = `
        background-image: linear-gradient(to bottom, #686868, #282828);
    `;

    const hoverCss = `
        background-image: linear-gradient();
    `;

    return card;
}

export { ProjectCard };