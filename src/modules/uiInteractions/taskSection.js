import registry from "../coreFunction/registry";
import {deleteProject, removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../coreFunction/basicFunction"
import htmlGenerator from "../htmlGenerator";
import filter from "../coreFunction/filter";
import randomUtilities from "../randomUtilities";
import externalLibraries from "../externalLibraries";
import Choices from "choices.js";
import flatpickr from "flatpickr";
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
      randomUtilities.findTaskObj(taskId)
      printTaskDetailsInUI(taskId)
    }
  }



function printTaskDetailsInUI(taskId){
  const task = randomUtilities.getTaskObj(taskId)
  const proj = randomUtilities.getProjObj(task.projectId)
  const tagIdsArr = task.tags
  const tagSet = new Set(tagIdsArr)
  const tagsArr = registry.allTags.filter(tag => tagSet.has(tag.tagId))
  console.table(tagsArr)
  const taskDetailsContainer = document.querySelector('.task-details-container')
  printTaskAndProjectName(task,proj,taskDetailsContainer)
  printTaskUrgency(tagsArr)
  printDatesUrgency(task)
  printDescription(task, taskDetailsContainer)
  printTaskTags(tagsArr)
}

function printTaskAndProjectName(task,proj,taskDetailsContainer){
  const taskName = taskDetailsContainer.querySelector('.task-name')
  const projectName = taskDetailsContainer.querySelector('.project-name')
  
  taskName.textContent = task.name
  projectName.textContent = proj.name
}

function printTaskUrgency(tagsArr){
  const urgencyTag = tagsArr.filter(tag => tag.type === 'urgency')
  if (urgencyTag.length > 0){
    externalLibraries.choiceJSInstances.urgencyTagger.setChoiceByValue(urgencyTag[0].tagId)
  } else {
    externalLibraries.choiceJSInstances.urgencyTagger.removeActiveItems()
  }
}

function printDatesUrgency(task){
  externalLibraries.flatpickrInstances.doDate.setDate(task.doDate)
  externalLibraries.flatpickrInstances.dueDate.setDate(task.dueDate)
}

function printTaskTags(tagsArr){
  const otherTags = tagsArr.filter(tag => tag.type === 'other')
  console.table(otherTags)
  const otherTagsValues = []
  otherTags.forEach(tag => {
    otherTagsValues.push(tag.tagId)
  })
  console.table(otherTagsValues)
  if (otherTags.length > 0){
    externalLibraries.choiceJSInstances.otherTagger.removeActiveItems()
    externalLibraries.choiceJSInstances.otherTagger.setChoiceByValue(otherTagsValues)
  } else {
    externalLibraries.choiceJSInstances.otherTagger.removeActiveItems()
    console.table('tanggal')
  }
}

function printDescription(task, taskDetailsContainer){
  const taskDescription = taskDetailsContainer.querySelector('#notes-area')
  taskDescription.value = task.description
}
export default {tasksStateObj,printFilteredTasks,loadTaskSelectEventListeners}