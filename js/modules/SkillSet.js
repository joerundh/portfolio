// Filter out techs used in the projects

const projects = await fetch("../json/projects.json").then(res => res.json());

const techUsed = [];

projects.forEach(project => {
    project.techstack.forEach(tech => {
        if (!techUsed.some(obj => obj.ref === tech.ref)) {
            techUsed.push(tech);
        }
    });
});

// Replace reference objects with tech objects

const tech = await fetch("../json/tech.json").then(res => res.json());

techUsed.forEach((obj, index) => {
    techUsed[index] = tech.find(refObj => refObj.ref === obj.ref);
});

const SkillSet = function() {
        
};

export { SkillSet };