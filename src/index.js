import "./styles.css"
import {Project, Task, Tag} from './modules/coreFunction/classes'
import truth from './modules/coreFunction/truth'
import {generateDefaults} from './modules/coreFunction/defaultObjs'
import {addProject, editProject, addTask, editTask, addTag, editTag,tagTask} from "./modules/coreFunction/basicFunction"

generateDefaults()

const testProj = addProject()
setTimeout(() => console.table(truth.allProjects)
,2000)


setTimeout(() => {
    editProject(testProj, 'testProj Name changed')
},3000)

const testAddTask = addTask(testProj)
setTimeout(() => {
    console.table(truth.allTasks)
},4000)

setTimeout(() => {
    editTask(testAddTask, testProj, "task name changed")
},5000)

const testTag = addTag()
setTimeout(() => { 
    editTag(testTag,"New edited name")
},5000)

setTimeout(() => { 
    tagTask(testAddTask,testTag)
    tagTask(testAddTask,truth.allTags[0].tagId)
},5500)


