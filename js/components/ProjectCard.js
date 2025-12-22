const profile = await fetch("./data/profile.json").then(res => res.json());
const hosts = await fetch("./data/hosts.json").then(res => res.json());

const ProjectCard = function(project) {
    const div = document.createElement("div");
    div.style = `
        width: 450px;
        padding: 40px;
        height: 600px;
        display: flex;
        font-family: "IBM Plex";
        flex-direction: column;
        justify-content: start;
        align-items: center;
        gap: 30px;
        border: 1px solid #444;
        color: #ccc;
        border-radius: 10px;
        backdrop-filter: invert(15%);
        transform: none;
        box-shadow: 5px 5px #111;
        transition: transform ease-in-out 150ms, backdrop-filter ease-in-out 150ms;
    `;
    div.onmousemove = () => {
        div.style.transform = "scale(110%)";
        div.style.backdropFilter = "invert(25%)";
    }
    div.onmouseleave = () => {
        div.style.transform = "none";
        div.style.backdropFilter = "invert(15%)";
    }

    // Title

    const title = document.createElement("h2");
    title.innerText = project.name;
    title.style = `
        text-align: center;
        font-weight: normal;
        font-size: 20px;
        text-shadow: 2px 2px black;
    `;
    div.append(title);

    // Feature

    const feature = document.createElement("img");
    feature.src = `./images/assets/screenshots/${project.ref}-screenshot.png`;
    feature.width = 400;
    feature.height = 225;
    feature.style = `
        border: 1px solid #444;
        border-radius: 5px;
        box-shadow: 5px 5px #111;
    `;
    div.append(feature)

    // Icons

    const icons = document.createElement("div");
    icons.style = `
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: center;
        align-items: center;
    `;

    project.techstack.forEach(tech => {
        const icon = document.createElement("img");
        icon.src = `./images/assets/icons/${tech.icon.filename}`;
        icon.alt = `${tech.name} icon`;
        icon.title = tech.name;
        icon.style = `
            width: 20px;
            height: 20px;
            ${tech.icon.invert ? "filter: invert(100%);" : ""}
        `;
        
        icons.appendChild(icon);
    });
    div.append(icons);

    // Links

    const links = document.createElement("div");
    links.style = `
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: 
    `;
    div.appendChild(links);

    // Repository link

    const repositoryHost = hosts.find(obj => obj.ref === project.repository.host.ref);

    const repositoryLink = document.createElement("a");
    repositoryLink.title = `Open ${repositoryHost.name} repository`;
    repositoryLink.target = "_blank";
    repositoryLink.style = `
        text-decoration: none;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
    `;

    const repositoryIcon = document.createElement("img");
    repositoryIcon.alt = `${repositoryHost.name} icon`;
    repositoryIcon.style = `
        width: 20px;
        height: 20px;
        ${repositoryHost.icon.invert ? "filter: invert(100%);" : ""}
    `;
    repositoryIcon.src = `./images/assets/icons/${repositoryHost.icon.filename}`;
    repositoryLink.appendChild(repositoryIcon);

    const repositoryLabel = document.createElement("span");
    repositoryLabel.innerText = "Repository";
    repositoryLabel.style = `
        color: #bbb;
        text-shadow: 2px 2px black;
        transition: color 100ms ease-in-out;
    `;
    repositoryLink.appendChild(repositoryLabel);

    repositoryLink.onmouseenter = e => { repositoryLabel.style.color = "#fff"; repositoryLabel.style.textDecoration = "underline"; };
    repositoryLink.onmouseleave = e => { repositoryLabel.style.color = "#bbb"; repositoryLabel.style.textDecoration = "none"; }

    repositoryLink.href =
        repositoryHost.urlformat.keys.map(key => {
            return {
                key,
                value: key === "username"
                            ? profile[repositoryHost.ref].username
                            : key === "pathname"
                                ? project.repository.pathname || project.ref
                                : key === "name"
                                    ? project.repository.name || project.ref
                                    : key === "prefix"
                                        ? project.repository.prefix || project.ref
                                        : project.ref
            };
        })
        .reduce((url, { key, value }) => url.replaceAll(`{${key}}`, value), repositoryHost.urlformat.template);
    
    links.append(repositoryLink)

    // Deployment link

    const deploymentHost = hosts.find(obj => obj.ref === project.deployment.host.ref);

    const deploymentLink = document.createElement("a");
    deploymentLink.title = `Open ${deploymentHost.name} deployment`;
    deploymentLink.target = "_blank";
    deploymentLink.style = `
        text-decoration: none;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
    `;

    const deploymentIcon = document.createElement("img");
    deploymentIcon.alt = `${deploymentHost.name} icon`;
    deploymentIcon.style = `
        width: 20px;
        height: 20px;
        ${deploymentHost.icon.invert ? "filter: invert(100%);" : ""}
    `;
    deploymentIcon.src = `./images/assets/icons/${deploymentHost.icon.filename}`;
    deploymentLink.appendChild(deploymentIcon);

    const deploymentLabel = document.createElement("span");
    deploymentLabel.innerText = "Deployment";
    deploymentLabel.style = `
        color: #bbb;
        text-shadow: 2px 2px black;
        transition: color 100ms ease-in-out;
    `;
    deploymentLink.appendChild(deploymentLabel);

    deploymentLink.onmouseenter = e => { deploymentLabel.style.color = "#fff"; deploymentLabel.style.textDecoration = "underline"; };
    deploymentLink.onmouseleave = e => { deploymentLabel.style.color = "#bbb"; deploymentLabel.style.textDecoration = "none"; }

    deploymentLink.href =
        deploymentHost.urlformat.keys.map(key => {
            return {
                key,
                value: key === "username"
                            ? profile[deploymentHost.ref].username || project.ref
                            : key === "pathname"
                                ? project.deployment.pathname || project.ref
                                : key === "name"
                                    ? project.deployment.name || project.ref
                                    : key === "prefix"
                                        ? project.deployment.prefix || project.ref
                                        : project.ref
            };
        })
        .reduce((url, { key, value }) => url.replaceAll(`{${key}}`, value), deploymentHost.urlformat.template);
    
    links.append(deploymentLink);

    // Description

    if (project.description) {
        const description = document.createElement("p");
        description.innerText = project.description;
        description.style = `
            width: 100%;
            font-size: 16px;
            color: #ddd;
            text-shadow: 2px 2px black;
        `;
        div.appendChild(description);
    }

    return {
        element: div
    }
};

export default ProjectCard;