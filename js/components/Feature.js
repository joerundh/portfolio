const Feature = function(src) {
    const img = document.createElement("img");
    img.src = src;
    const imgBaseStyle = `
        border: 1px solid white;
        border-radius: 5%;
        transition:
            width 300ms ease-in-out,
            height 300ms ease-in-out;
        box-shadow: 5px 5px black;
    `;

    const imgMinimalStyle = () => `
        ${imgBaseStyle}
        height: 160px;  
    `;

    const imgMaximialStyle = () => `
        ${imgBaseStyle}
        height: 300px;
    `;

    img.style = imgMaximialStyle();

    return {
        element: img,
        setToMinimal: () => { img.style = imgMinimalStyle(); },
        setToMaximal: () => { img.style = imgMaximialStyle(); }
    }
}

export default Feature;