const Name = function(name) {
    const h1 = document.createElement("h1");
    h1.innerText = name;
    h1.style = `
        font-size: 54px;
        font-family: "IBM Plex";
        color: rgba(0, 0, 0);
        font-weight: normal;
        text-shadow:
            1px 0px #ddd,
            0px -1px #ddd,
            -1px 0px #ddd,
            0px 1px #ddd,
            1px 1px #ddd,
            -1px 1px #ddd,
            1px -1px #ddd,
            -1px -1px #ddd,
            3px 3px #999;
        transition: font-size 300ms ease-in-out, text-border 300ms ease-in-out;
    `;

    const setToMinimal = () => {
        h1.style.fontSize = "28px";
        h1.style.textShadow = `
            0.5px 0px #aaa,
            0px -0.5px #aaa,
            -0.5px 0px #aaa,
            0px 0.5px #aaa,
            0.5px 0.5px #aaa,
            -0.5px 0.5px #aaa,
            0.5px -0.5px #aaa,
            -0.5px -0.5px #aaa,
            2px 2px #999;
        `;
    }

    const setToMaximal = () => {
        h1.style.fontSize = "54px";
        h1.style.textShadow = `
            1px 0px #ddd,
            0px -1px #ddd,
            -1px 0px #ddd,
            0px 1px #ddd,
            1px 1px #ddd,
            -1px 1px #ddd,
            1px -1px #ddd,
            -1px -1px #ddd,
            3px 3px #999;
        `;
    }

    return {
        element: h1,
        setToMaximal,
        setToMinimal
    }
}

export default Name;