import registry from "../coreFunction/registry";
import {deleteProject, removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../coreFunction/basicFunction"
import htmlGenerator from "../htmlGenerator";
import filter from "../coreFunction/filter";
const tasksStateObj = {
    selectedTask: null,
    shownTasks:[],
    isCreatingNewTask: false,
}

function printFilteredTasks(){
    const filteredArr = filter.filterAll(filter.filterObj)
    htmlGenerator.generateTaskList(filteredArr)
}

//just need to hook up the HTML generator for task details
function loadTaskSelectEventListeners(){
    const tasks = document.querySelectorAll('.task')
    tasks.forEach(task => {
        task.addEventListener('click', () => {
            selectTask(task.dataset.taskId,task.textContent)
      })
    });
  }

function selectTask(taskId,taskName){
    if (tasksStateObj.isCreatingNewTask){ //disables when creating task
      return
    } else {
      console.log(`${taskName} selected with task ID: ${taskId}` )
    }
  }

export default {tasksStateObj,printFilteredTasks,loadTaskSelectEventListeners}