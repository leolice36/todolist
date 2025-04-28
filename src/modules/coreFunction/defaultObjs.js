import {Project, Task, Tag} from './classes'
import truth from './truth'


function generateDefaults(){
    const defaultProj = new Project("New Project", undefined, undefined, "Default project on initialize")
    truth.allProjects.push(defaultProj)

    for (let i = 0; i < 3; i++){
        const defaultTask = new Task(`New Task ${i+1}`, undefined, undefined, "Default task on initialize", defaultProj.projectId)
        truth.allTasks.push(defaultTask)
    }

    const urgencyHigh = new Tag('High','urgency')
    const urgencyMed = new Tag('Medium','urgency')
    const urgencyLow = new Tag('Low','urgency')
    const defaultTag1 = new Tag('New Tag 1','other')
    truth.allTags.push(urgencyHigh, urgencyMed, urgencyLow, defaultTag1)
    console.table(truth.allProjects)
    console.table(truth.allTasks)
    console.table(truth.allTags)
}

export {generateDefaults}