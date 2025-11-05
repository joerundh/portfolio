const Description = function(text) {
    const p = document.createElement("p");
    p.innerText = text;
    p.style = `
        font-size: 22px;
        font-family: "IBM Plex";
        color: #eee;
        text-shadow: 2px 2px #444;
        height: fit-content;
        transition: height 300ms ease-in-out, opacity 300ms ease-in-out;
    `;

    return {
        element: p,
        setToMinimal: () => {
            p.style.height = 0;
            p.style.opacity = 0;
        },
        setToMaximal: () => {
            p.style.height = "fit-content";
            p.style.opacity = 1;
        }
    }
}

export default Description;