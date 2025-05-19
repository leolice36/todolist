import registry from "../coreFunction/registry";
import {deleteProject, removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../coreFunction/basicFunction"
import htmlGenerator from "../htmlGenerator";
import filter from "../coreFunction/filter";
import randomUtilities from "../randomUtilities";
import externalLibraries from "../externalLibraries";
import Choices from "choices.js";
import flatpickr from "flatpickr";
import projectSection from "./projectSection";
const tasksStateObj = {
    selectedTask: null,
    shownTasks:[],
    isCreatingNewTask: false,
    latestTaskId: null,
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
            selectTask(task.dataset.taskId)
            
      })
    });
  }

function selectTask(taskId){
    if (tasksStateObj.isCreatingNewTask){ //disables when creating task
      return
    } else {
      const detailsContainer = document.querySelector('.task-details-container')
      if (getComputedStyle(detailsContainer).display === 'none'){
        toggleTaskDetails()
      }
      tasksStateObj.selectedTask=taskId
      randomUtilities.findTaskObj(taskId)
      printTaskDetailsInUI(taskId)
      styleSelectedTask()
      console.log(tasksStateObj.selectedTask)
    }
  }


function styleSelectedTask(){
  const tasks = document.querySelectorAll('.task')
  tasks.forEach(task => {
    if (task.dataset.taskId == tasksStateObj.selectedTask){
      task.style.backgroundColor = 'red'
    } else {
      task.style.backgroundColor = 'black'
    }
  })
}

function initializeCheckBoxEventlistener(checkbox){
  checkbox.addEventListener('change', (event) => {
    if(event.target.checked){
      console.log(`${checkbox.dataset.taskId} is Done`)
      updateTaskObjIsDone(checkbox.dataset.taskId,true)
      selectTask(checkbox.dataset.taskId)
    } else {
      console.log(`${checkbox.dataset.taskId} is unchecked`)
      updateTaskObjIsDone(checkbox.dataset.taskId,false)
      selectTask(checkbox.dataset.taskId)
    }
  })
}

function updateTaskObjIsDone(taskId,boolean){
  editTask(taskId,{isDone: boolean})
}

function loadTaskDetailsHandler(){
  const addTaskBtn = document.querySelector('.add-task')
  addTaskBtn.addEventListener('click', addTaskBtnSequence)

  const saveBtn = document.querySelector('.save-task')
  saveBtn.addEventListener('click', saveTaskBtnSequence)


  // const cancelBtn = document.querySelector('.cancel-changes')
  // cancelBtn.addEventListener('click', cancelBtnSequence)
}

function addTaskBtnSequence(){
  tasksStateObj.isCreatingNewTask = true //disable on select task function applied
  disableTaskSelect()
  let projId = projectSection.projectDetailsState.selectedProjectId
  let newTaskId;
  if (projId === null){
    newTaskId = addTask('random')
    projId = 'random'
  } else {
    newTaskId = addTask(projId)
  }
  tasksStateObj.latestTaskId = newTaskId
  tasksStateObj.selectedTask = tasksStateObj.latestTaskId
  const task = randomUtilities.getTaskObj(newTaskId)
  console.table(task)
  projectSection.selectProj(projId)
  tasksStateObj.isCreatingNewTask = false
  selectTask(newTaskId)
}

//UI only disable, actual disable happens on the select function
function disableTaskSelect(){
  const tasks = document.querySelectorAll('.task')
  tasks.forEach(task => {
    task.style.cursor = 'default'
  });
}

//not needed for now
function clearTaskDetailsUI(){

}

function saveTaskBtnSequence(){
  saveTaskChanges(tasksStateObj.selectedTask)
  const detailsContainer = document.querySelector('.task-details-container')
  if (getComputedStyle(detailsContainer).display === 'block'){
    toggleTaskDetails()
  }
  printFilteredTasks()
  
}

function toggleTaskDetails(){
  const container = document.querySelector('.task-details-container')
  if (getComputedStyle(container).display === 'none'){
    container.style.display = 'block'
  } else if (getComputedStyle(container).display === 'block'){
    container.style.display = 'none'
  } else {
    console.log('may mali')
  }
}

function saveTaskChanges(taskId){
  const changes = createTaskChangesObj()
  editTask(taskId,changes)
}

function createTaskChangesObj(){
  const taskName = document.querySelector('input.task-name')
  const doDate = document.querySelector('input#do-date')
  const dueDate = document.querySelector('input#due-date')
  const taskDescription = document.querySelector('#notes-area')
  
  const changes = {};
  const tags = [];
  const urgencyId = externalLibraries.choiceJSInstances.urgencyTagger.getValue(true)
  const otherTagIds = externalLibraries.choiceJSInstances.otherTagger.getValue(true)
  tags.push(urgencyId)
  tags.push(...otherTagIds)

  if (doDate.value !== '' && dueDate.value !== ''){
      changes.name =  taskName.value
      changes.doDate = new Date(doDate.value).toISOString()
      changes.dueDate = new Date(dueDate.value).toISOString()
      changes.tags = tags
      changes.description = taskDescription.value
  } else {
    changes.name =  taskName.value
    changes.tags = tags
    changes.description = taskDescription.value
  }
  console.table(changes)
  return changes
}

function printTaskDetailsInUI(taskId){
  const task = randomUtilities.getTaskObj(taskId)
  const proj = randomUtilities.getProjObj(task.projectId)
  const tagIdsArr = task.tags
  const tagSet = new Set(tagIdsArr)
  const tagsArr = registry.allTags.filter(tag => tagSet.has(tag.tagId))

  const taskDetailsContainer = document.querySelector('.task-details-container')
  printTaskAndProjectName(task,proj,taskDetailsContainer)
  printIsDone(task,taskDetailsContainer)
  printTaskUrgency(tagsArr)
  printDatesUrgency(task)
  printDescription(task, taskDetailsContainer)
  printTaskTags(tagsArr)
}
function printIsDone(task,taskDetailsContainer){
  const isDone = taskDetailsContainer.querySelector('.is-done-print')
  if (task.isDone === true){
    isDone.style.display = 'block'
  } else {
    isDone.style.display = 'none'
  }
}

function printTaskAndProjectName(task,proj,taskDetailsContainer){
  const taskName = taskDetailsContainer.querySelector('.task-name')
  const projectName = taskDetailsContainer.querySelector('.project-name')
  
  taskName.value = task.name
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
  
  const otherTagsValues = []
  otherTags.forEach(tag => {
    otherTagsValues.push(tag.tagId)
  })
  if (otherTags.length > 0){
    externalLibraries.choiceJSInstances.otherTagger.removeActiveItems()
    externalLibraries.choiceJSInstances.otherTagger.setChoiceByValue(otherTagsValues)
  } else {
    externalLibraries.choiceJSInstances.otherTagger.removeActiveItems()
    console.table('wala na tag')
  }
}

function printDescription(task, taskDetailsContainer){
  const taskDescription = taskDetailsContainer.querySelector('#notes-area')
  taskDescription.value = task.description
}
export default {tasksStateObj,printFilteredTasks,loadTaskSelectEventListeners,loadTaskDetailsHandler,toggleTaskDetails,initializeCheckBoxEventlistener}