const ProjectsBrowser = function(manager) {
    const div = document.createElement("div");
    div.style = `
        width: 100%;
        height: 80vh;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 50px;
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0);
    `;

    return {
        element: div
    };
}

export default ProjectsBrowser;