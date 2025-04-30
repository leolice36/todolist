import {Project, Task, Tag} from './classes'
import registry from './registry'
import {addProject, editProject, addTask} from './basicFunction'

function generateDefaults(){
    const defaultProj = new Project("Default Project", undefined, undefined,undefined, "Default project on initialize")
    registry.allProjects.push(defaultProj)

    for (let i = 0; i < 3; i++){
        const defaultTask = new Task(false, defaultProj.projectId, `New Task ${i+1}`,undefined, undefined, undefined, "Default task on initialize", defaultProj.projectId)
        registry.allTasks.push(defaultTask)
    }

    const urgencyHigh = new Tag('High','urgency')
    urgencyHigh.tagId = 'high'
    const urgencyMed = new Tag('Medium','urgency')
    urgencyMed.tagId = 'medium'
    const urgencyLow = new Tag('Low','urgency')
    urgencyLow.tagId = 'low'
    const defaultTag1 = new Tag('New Tag 1','other')
    registry.allTags.push(urgencyHigh, urgencyMed, urgencyLow, defaultTag1)
    console.table(registry.allProjects)
    console.table(registry.allTasks)
    console.table(registry.allTags)
}

export {generateDefaults}