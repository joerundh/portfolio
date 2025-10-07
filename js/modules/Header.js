// Header creator

const Header = () => {
    const header = document.createElement("header");

    const baseCss = `
        width: 100%;
        background-image: linear-gradient(to bottom, #505070, #404050);
        transition: height 500ms ease-in-out;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;
        
    const fullCss = () => `
        ${baseCss}
        height: 90%;
    `;
    
    const minimalCss = () => `
        ${baseCss}
        height: 15%;
    `;

    const setToFull = () => {
        header.style = fullCss();
    }

    const setToMinimal = () => {
        header.style = minimalCss();
    }

    setToFull();

    const h1 = document.createElement("h1");
    h1.innerText = "Yeahhh";
    header.appendChild(h1);

    return {
        component: header,
        setToFull,
        setToMinimal
    };
};

export { Header };