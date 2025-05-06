import "./styles.css"
import registry from '../modules/coreFunction/registry'
import {generateDefaults} from '../modules/coreFunction/defaultObjs'
import {addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../modules/coreFunction/basicFunction"
import testScript from './test'
generateDefaults()


const taskChanges = {
    isDone: true,
    name:'name changed',
    // projectId: 'NICE',
    // makeDate:,
    // doDate,
    // dueDate,
    description: 'description change',
}

const projChanges = {
    name: 'EDIT DEFAULT',
    // makeDate
    // startDate 
    // endDate 
    description: "WORKS",
}

const testTask1 = registry.allTasks[0].taskId
const defaultProj = registry.allProjects[0].projectId
editTask(testTask1,taskChanges)
editProject(defaultProj,projChanges)