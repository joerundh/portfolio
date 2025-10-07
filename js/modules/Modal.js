const Modal = function(children) {
    const fullscreen = document.createElementById("div");
    const fullScreenCss = `
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: -1;
        backdrop-filter: opacity(0.2);
    `;

    const modal = document.createElement("div");
    const modalCss = `
        width: 
    `;

    children.forEach(element => modal.appendChild(element));
}