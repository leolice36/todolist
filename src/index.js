import "./styles.css"
import {Project, Task, Tag} from './modules/coreFunction/classes'
import registry from './modules/coreFunction/registry'
import {generateDefaults} from './modules/coreFunction/defaultObjs'
import {addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "./modules/coreFunction/basicFunction"
import filter from './modules/coreFunction/filter'
generateDefaults()

const defaultProj = registry.allProjects[0]
const testProj1= addProject("TESTPROJ1")
const testTask1= addTask(testProj1, "TEST1task")
const testTask2= addTask(testProj1, "TEST2task")
const testTag1 = addTag('TEST1tag')
const testTag2 = addTag('TEST2tag')
setTimeout(() => { 
    tagOther(testTask1,testTag1)
    tagOther(testTask1,testTag2)
    tagOther(testTask2,testTag1)
    tagUrgency(testTask1,'high')
    tagUrgency(testTask2,'high')
},1000)

setTimeout(() => {
    filter.filterObj.tagFilter.push(testTag1,testTag2)
    console.table(filter.filterObj)
    console.table(filter.byProject(testProj1))
    // const filteredArr = filter.filterAll(filter.filterObj)
    // console.table(filteredArr)
},1500)

//console.table(filter.byUrgency('high', filteredByOther)) DOUBLE filter works
//I have to think how to implement this though