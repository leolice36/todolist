import "./styles.css"
import {Project, Task, Tag} from './modules/coreFunction/classes'
import registry from './modules/coreFunction/registry'
import {generateDefaults} from './modules/coreFunction/defaultObjs'
import {addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "./modules/coreFunction/basicFunction"
import filter from './modules/coreFunction/filter'
import { subDays, addDays, formatISO, parseISO, isToday, isTomorrow, isThisWeek, isThisMonth, isPast } from 'date-fns';

generateDefaults()


const randomTask1 = registry.allTasks[0]
const randomTask2 = registry.allTasks[1]
const randomTask3 = registry.allTasks[2]
// const addedProj1 = addProject('Extra')
// const addedTask1 = addTask(addedProj1,'X Task')
// const addedTag1 = addTag('X Tag')
// tagOther(addedTask1,addedTag1)
// tagUrgency(addedTask1,'high')
const date = new Date()
const changesArr1 = {
    doDate: formatISO(addDays(date,1))
    ,dueDate: formatISO(addDays(date,1))
}
const changesArr2 = {
    doDate: formatISO(addDays(date,2))
    ,dueDate: formatISO(addDays(date,2))
}
const changesArr3 = {
    doDate: formatISO(addDays(date,10))
    ,dueDate: formatISO(addDays(date,10))
}
editTask(randomTask1.taskId, changesArr1)
editTask(randomTask2.taskId, changesArr2)
editTask(randomTask3.taskId, changesArr3)
tagUrgency(randomTask1.taskId,'high')
setTimeout(() => {
    const testFiltered = filter.filterAll(filter.filterObj)
    console.table(testFiltered)
}, 1000)