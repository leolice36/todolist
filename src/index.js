import "./styles.css"
import {Project, Task, Tag} from './modules/coreFunction/classes'
import registry from './modules/coreFunction/registry'
import {generateDefaults} from './modules/coreFunction/defaultObjs'
import {addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "./modules/coreFunction/basicFunction"
import filter from './modules/coreFunction/filter'
generateDefaults()

const testOtherTag1 = addTag('YAS')
const testOtherTag2 = addTag('NAH')
const testOtherTag3 = addTag('NOT USED')
setTimeout(() => { 
    tagOther(registry.allTasks[0].taskId,testOtherTag1)
    tagOther(registry.allTasks[1].taskId,testOtherTag1)
    tagOther(registry.allTasks[2].taskId,testOtherTag2)
},1000)

setTimeout(() => {
    console.log('here')
    console.table(filter.byUrgency('medium'))
    console.log('here')
},1500)

//console.table(filter.byUrgency('high', filteredByOther)) DOUBLE filter works
//I have to think how to implement this though