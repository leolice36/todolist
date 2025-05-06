import "./styles.css"
import registry from '../modules/coreFunction/registry'
import {generateDefaults} from '../modules/coreFunction/defaultObjs'
import {addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../modules/coreFunction/basicFunction"
import testScript from './test'
generateDefaults()


const changes = {
    isDone: true,
    name:'name changed',
    // projectId: 'NICE',
    // makeDate:,
    // doDate,
    // dueDate,
    // description: 'description change',
}

const testTask1 = registry.allTasks[0].taskId
testScript.editTask(testTask1,changes)