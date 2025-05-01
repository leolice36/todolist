import "./styles.css"
import {Project, Task, Tag} from './modules/coreFunction/classes'
import registry from './modules/coreFunction/registry'
import {generateDefaults} from './modules/coreFunction/defaultObjs'
import {addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "./modules/coreFunction/basicFunction"
import filter from './modules/coreFunction/filter'
generateDefaults()

const testProj = addProject()
setTimeout(() => console.table(registry.allProjects)
,1000)


setTimeout(() => {
    editProject(testProj, 'testProj Name changed')
},1500)

const testAddTask = addTask(testProj)
setTimeout(() => {
    console.table(registry.allTasks)
},2000)

setTimeout(() => {
    editTask(testAddTask, testProj, "task name changed")
},2500)

const testTag = addTag()
setTimeout(() => { 
    editTag(testTag,"New edited name")
},3000)

setTimeout(() => { 
    tagOther(testAddTask,testTag)
    tagOther(testAddTask,registry.allTags[0].tagId)
},3500)


setTimeout(() => { 
    console.log('from here')
    console.table(filter.byTag(testTag))
    console.log('to here')
},4000)

setTimeout(() => { 
    tagUrgency(testAddTask,'low')
    console.table(filter.byTag('low'))
   
},4500)

