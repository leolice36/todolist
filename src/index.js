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
const testFiltered = filter.byDate('tomorrow','dueDate')
console.table(testFiltered)