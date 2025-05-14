import registry from "../coreFunction/registry";
import {deleteProject, removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../coreFunction/basicFunction"
import htmlGenerator from "../htmlGenerator";
import filter from "../coreFunction/filter";
const tasksStateObj = {
    selectedTask: null,
    shownTasks:[],
}

function printFilteredTasks(){
    const filteredArr = filter.filterAll(filter.filterObj)
    htmlGenerator.generateTaskList(filteredArr)
}

export default {tasksStateObj,printFilteredTasks}