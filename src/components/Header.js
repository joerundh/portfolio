const Header = function() {
    const div = document.createElement("header");
    const divBaseStyle = `
        width: 100%;
        position: absolute;
        top: 0;
        transition: height 300ms ease-in-out, border-bottom 300ms ease-in-out;
        background-image: linear-gradient(to bottom, #000, #222);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        border-bottom-width: 1px;
        border-bottom-style: solid;
    `;

    const divMinimalStyle = () => `
        ${divBaseStyle}
        height: 200px;
        border-bottom-color: #666;
    `;

    const divMaximalStyle = () => `
        ${divBaseStyle}
        height: 100%;
        border-bottom-color: #000;
    `;

    const setToMinimal = () => {
        div.style = divMinimalStyle();
    }

    const setToMaximal = () => {
        div.style = divMaximalStyle();
    }

    div.style = divMaximalStyle();

    return {
        element: div,
        setToMinimal,
        setToMaximal
    }
}

export default Header;