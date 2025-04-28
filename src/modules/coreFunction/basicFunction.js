import {Project, Task, Tag} from './classes'
import truth from './truth'
function addProject() {
    const newProj = new Project("Test Project", undefined, undefined, "Test on initialize")
    truth.allProjects.push(newProj)
}

function editProject(proID, name, makeDate, startDate, endDate, description) {
    const proj = truth.allProjects.find(p => p.projectId === proID)
    proj.name = name;
    proj.makeDate = makeDate;
    proj.startDate = startDate;
    proj.endDate = endDate;
    proj.description = description;
    console.table(proj)
    console.table(truth.allProjects)
}
window.editProject = editProject
export {addProject}