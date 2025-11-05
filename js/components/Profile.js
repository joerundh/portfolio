const Profile = function() {
    const div = document.createElement("div");
    const divBaseStyle = `
        min-width: 1000px;
        display: flex;
        flex-direction: row;
        justify-content: start;
        gap: 50px;
        align-items: start;
        transition: height 300ms ease-in-out;
    `;
    
    const divMinimalStyle = () => `
        ${divBaseStyle}
        height: 160px;
    `;

    const divMaximalStyle = () => `
        ${divBaseStyle}
        height: 500px;
    `;

    div.style = divMaximalStyle();

    return {
        element: div,
        setToMinimal: () => { div.style = divMinimalStyle(); },
        setToMaximal: () => { div.style = divMaximalStyle(); }
    }
}

export default Profile;