import Header from "./components/Header.js";
import Feature from "./components/Feature.js";
import ScrollController from "./modules/ScrollController.js";
import TimedCalls from "./modules/TimedCalls.js";
import Profile from "./components/Profile.js";
import Name from "./components/Name.js";
import SlideFade from "./modules/SlideFade.js";
import Description from "./components/Description.js";
import Icon from "./components/Icon.js";
import ProgressBar from "./components/ProgressBar.js";
import ProjectsManager from "./modules/ProjectsManager.js";
import ProjectsBrowser from "./components/ProjectsBrowser.js";
import ProjectCard from "./components/ProjectCard.js";


/*=======================
JSON IMPORT AND TREATMENT
=======================*/

const profileInfo = await fetch("./data/profile.json").then(res => res.json());

const techs = await fetch("./data/tech.json").then(res => res.json());

const projects = await fetch("./data/projects.json").then(res => res.json());
projects.forEach(project => {
    project.techstack = project.techstack.map(tech => techs.find(obj => obj.ref === tech.ref));
});

const usedTechs = projects.reduce((acc, { techstack }) => {
    techstack.forEach(techRef => {
        if (!acc.find(obj => obj.ref === techRef.ref)) {
            acc.push(techRef);
        }
    });
    return acc;
}, [])
    .map(techRef => techs.find(obj => obj.ref === techRef.ref))
    .filter(tech => tech.display)
    .sort((techA, techB) => techA.index - techB.index);


/*==================
MAIN HEADER ELEMENTS
==================*/

// The header itself

const header = Header();

// Profile container

const profile = Profile();
header.element.appendChild(profile.element);

// Info container

const info = document.createElement("div");
info.style = `
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: between;
    align-items: start;
    gap: 25px;
`;
header.element.appendChild(info);


/*======================
ADAPTIVE HEADER ELEMENTS
======================*/

// Feature photo

const feature = Feature("./images/assets/profile/feature.jpg");
const featureSlideFade = SlideFade({
    element: feature.element,
    displacement: 50,
    duration: 300
});
profile.element.appendChild(feature.element);

profile.element.appendChild(info);

// Name

const name = Name(profileInfo.name);
const nameSlideFade = SlideFade({
    element: name.element,
    displacement: 50,
    duration: 300
});
info.append(name.element);

// Contact

const contact = document.createElement("div");
contact.style = `
    display: flex;
    flex-direction: row;
    gap: 50px;
`;

// Email

const email = document.createElement("a");
email.innerText = profileInfo.email;
email.href = `mailto:${profileInfo.email.replace("(at)", "@")}`;
email.title = `E-mail: ${profileInfo.email}`
email.style = `
    color: #999;
    font-family: "IBM Plex";
    text-shadow: 2px 2px #444;
    font-size: 20px;
    text-decoration: none;
    transition: color ease-in-out 100ms;
`;
email.onmouseenter = e => { email.style.color = "#fff"; email.style.textDecoration = "underline"; };
email.onmouseleave = e => { email.style.color = "#999"; email.style.textDecoration = "none"; };
contact.appendChild(email)

// Github

const github = document.createElement("a");
const githubUrl = `https://github.com/${profileInfo.github.username}`
github.innerText = githubUrl;
github.href = githubUrl;
github.target = "_blank";
github.title = `Github: ${profileInfo.github.username}`;
github.style = `
    color: #999;
    font-family: "IBM Plex";
    text-shadow: 2px 2px #444;
    font-size: 20px;
    text-decoration: none;
    transition: color ease-in-out 100ms;
`;
github.onmouseenter = e => { github.style.color = "#fff"; github.style.textDecoration = "underline"; };
github.onmouseleave = e => { github.style.color = "#999"; github.style.textDecoration = "none"; };
contact.appendChild(github);

const contactSlideFade = SlideFade({
    element: contact,
    displacement: 50,
    duration: 300
});
info.append(contact);

// Icons

const iconsContainer = document.createElement("div");
iconsContainer.style = `
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 10px;
`;

const allIconsSlideFade = TimedCalls();

const icons = usedTechs.map((tech, index) => {
    const icon = Icon({
        src: `./images/assets/icons/${tech.icon.filename}`,
        invert: !!tech.icon.invert,
        title: tech.name,
        size: 40,
        selectCallback: () => manager.addToFilter({ ref: tech.ref }),
        unselectCallback: () => manager.removeFromFilter({ ref: tech.ref })
    });

    const slideFade = SlideFade({
        element: icon.element,
        displacement: 30,
        duration: 100
    });
    iconsContainer.appendChild(icon.element);
    allIconsSlideFade.add(`icon${index}`, slideFade);
    allIconsSlideFade.timeCall(`icon${index}`, index*30);

    // Event listener for project browser goes here

    return icon;
});

info.appendChild(iconsContainer);

const enableAllIcons = () => icons.forEach((icon, index) => {
    setTimeout(icon.enable, 200 + index*50);
});

const disableAllIcons = () => icons.forEach(icon => icon.disable());

// Description

const description = Description(profileInfo.description);
const descriptionSlideFase = SlideFade({
    element: description.element,
    displacement: 50,
    duration: 300
});
info.append(description.element);

/*=============
HEADER CONTROLS
=============*/

const openHeader = () => {
    header.setToMaximal();
    profile.setToMaximal();
    feature.setToMaximal();
    name.setToMaximal();
    disableAllIcons();
    description.setToMaximal();
}

const collapseHeader = () => {
    header.setToMinimal();
    profile.setToMinimal();
    feature.setToMinimal();
    name.setToMinimal();
    enableAllIcons();
    description.setToMinimal();
}


/*======
PROJECTS
======*/

// Project manager

const manager = ProjectsManager({ projects, techs: techs });

// Project browser

const browser = ProjectsBrowser();


/*=======
SCROLLING
=======*/

// Scroll controller

const controller = ScrollController({
    init: 0,
    max: Math.ceil(manager.list.value.length/3) || 1
});

// Listeners, and pausing

const addScrollListener = () => window.addEventListener("wheel", controller.callback);

const removeScrollListener = () => window.removeEventListener("wheel", controller.callback);

const pauseScrolling = () => {
    removeScrollListener();
    setTimeout(addScrollListener, 200);
}

// Progress bar

const progressBar = ProgressBar({
    max: Math.ceil(manager.list.value.length/3) || 1,
    startColor: { r1: 64, g1: 64, b1: 64 },
    endColor: { r2: 255, g2: 255, b2: 255 },
    position: "bottom",
    width: 5
});


/*=======
CALLBACKS
=======*/

// Project manager

manager.list.onSet = () => {
    controller.max = Math.ceil(manager.list.value.length/3) || 1;
};

manager.index.onSet = () => {
    pauseScrolling();
    browser.element.innerHTML = "";

    if (manager.list.value.length) {
        const newCards = manager.getView().map(project => ProjectCard(project));
        const cardSlideFades = newCards.map(card => SlideFade({
            element: card.element,
            displacement: 50,
            duration: 300
        }));

        newCards.forEach(card => browser.element.appendChild(card.element));
        cardSlideFades.forEach((slideFade, index) => setTimeout(slideFade, 100 + index*50));
        return;
    }

    const message = document.createElement("p");
    message.style = `
        font-size: 14px;
        font-family: "IBM Plex";
        color: #999;
    `;
    message.innerText = "No projects containing all the chosen techs."
    browser.element.appendChild(message);
};

// Scroll controller

controller.onScroll = pauseScrolling;

controller.onLeaveTop = () => {
    collapseHeader();
    setTimeout(() => {
        document.body.appendChild(browser.element);
        document.body.appendChild(progressBar.element);
        manager.index.value = 0;
    }, 300);
};

controller.onReachTop = () => {
    browser.element.innerHTML = "";
    browser.element.remove();
    progressBar.element.remove();
    openHeader();
};

// Scroll controller simplex callbacks

controller.plex.max.onSet = () => {
    progressBar.max = controller.max;
    controller.current = 1;
};

controller.plex.current.onSet = () => {
    if (controller.current) manager.index.value = controller.current - 1;
    progressBar.current = controller.current;
};

/*=================
INITIAL TIMED CALLS
=================*/

const init = TimedCalls();

document.body.appendChild(header.element);

init.add("feature", () => {
    featureSlideFade();
})
init.timeCall("feature", 500);

init.add("name", () => {
    nameSlideFade();
})
init.timeCall("name", 500 + 100);

init.add("contact", () => {
    contactSlideFade();
})
init.timeCall("contact", 500 + 200)

init.add("description", () => {
    descriptionSlideFase();
});
init.timeCall("description", 500 + 300);

init.add("icons", () => {
    allIconsSlideFade.run();
});
init.timeCall("icons", 500 + 400);


/*===================
OKAY, READY TO SET UP
===================*/

// Scroll controller

addScrollListener();

// Run initial timed calls

init.run();