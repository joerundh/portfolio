const Profile = function() {
    // Parent element

    const div = document.createElement("div");
    const css = `
        width: 800px;
        height: 80%;
        display: flex;
        flex-direction: row;
        gap: 20px;
        justift-content: center;
        align-items: center;
    `;
    div.style = css;

    // Picture

    const img = document.createElement("img");
    const imgBaseCss = `
        transition: height 500ms ease-in-out, width 500ms ease-in-out;
    `;
    const imgFullCss = () => `
        ${imgBaseCss}
        max-height: 500px;
    `;

    const imgMinimalCss = () => `
        ${imgBaseCss}
        max-height: 80%;
    `;

    // Information

    const info = document.createElement("div")

    const h1 = document.createElement();

    // Email

    const email = document.createElement("div");

    // Adjusters

    const setFullProfile = () => {

    }

    const setMinimalProfile = () => {

    };

    return { component: div, setFullProfile, setMinimalProfile };
};

export { Profile }