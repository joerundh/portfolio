import Simplex from "/src/modules/Simplex.js";

const ProjectsManager = function({
    projects,
    techs
}) {
    const filter = Simplex({ initial: [] });

    const list = Simplex({ initial: [ ...projects ] });
    const index = Simplex({ initial: 0 });

    filter.onSet = () => 
        list.value =
            filter.value.length
                ? projects.filter(project => filter.value.every(tech => project.techstack.find(obj => obj.ref === tech.ref)))
                : [ ...projects ];

    const addToFilter = tech => {
        if (!techs.find(obj => obj.ref === tech.ref)) return;
        if (filter.value.find(obj => obj.ref === tech.ref)) return;
        filter.value = [ ...filter.value, tech ];
    }

    const removeFromFilter = tech => {
        if (!techs.find(obj => obj.ref === tech.ref)) return;
        if (!filter.value.find(obj => obj.ref === tech.ref)) return;
        filter.value = filter.value.filter(obj => obj.ref !== tech.ref);
    }

    const getView = () => list.value.slice(index.value*3, (index.value + 1)*3);

    return {
        list,
        index,
        addToFilter,
        removeFromFilter,
        getView
    };
};

export default ProjectsManager;