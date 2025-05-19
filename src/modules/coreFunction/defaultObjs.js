import {Project, Task, Tag} from './classes'
import registry from './registry'
import {addProject, editProject, addTask} from './basicFunction'
import { formatISO, parseISO, isToday, isTomorrow, isThisWeek, isThisMonth, isPast } from 'date-fns';

function generateDefaults(){
    const today = new Date()
    const todayISO = formatISO(today)
    const defaultProj = new Project("Random", todayISO, todayISO,undefined, "Default project on initialize")
    defaultProj.projectId = 'random'
    registry.allProjects.push(defaultProj)

    for (let i = 0; i < 3; i++){
        const defaultTask = new Task(true, defaultProj.projectId, `New Task ${i+1}`, todayISO, todayISO, todayISO, "Default task on initialize", defaultProj.projectId)
        registry.allTasks.push(defaultTask)
    }

    const urgencyHigh = new Tag('High','urgency')
    urgencyHigh.tagId = 'high'
    const urgencyMed = new Tag('Medium','urgency')
    urgencyMed.tagId = 'medium'
    const urgencyLow = new Tag('Low','urgency')
    urgencyLow.tagId = 'low'
    registry.allTags.push(urgencyHigh, urgencyMed, urgencyLow)
    console.table(registry.allProjects)
    console.table(registry.allTasks)
    console.table(registry.allTags)
}

export {generateDefaults}