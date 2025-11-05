const ProjectCard = function(project) {
    const div = document.createElement("div");
    div.style = `
        width: 500px;
        height: 600px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px solid #999;
        color: #bbb;
        border-radius: 20px;
    `;

    // Title

    const title = document.createElement("h2");
    title.innerText = project.name;
    title.style = `
        text-align: center;
        font-family: "IBM Plex";
        font-weight: normal;
        font-size: 20px;
    `;
    div.append(title);

    // Icons



    // Description

    const description = document.createElement("p");
    description.style = `
        width: 
        border: 1px solid #777;
        border-radius: 20px;
        font-size: 12px;
    `;

    return {
        element: div
    }
};

export default ProjectCard;