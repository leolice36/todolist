import registry from '../modules/coreFunction/registry'
import {deleteProject, removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../modules/coreFunction/basicFunction"
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import { format } from "date-fns"
import externalLibraries from './externalLibraries';
import htmlGenerator from './htmlGenerator';

//Used to actually tag the object
function setupAddRemoveEventListenersForTask(taskId,tagSelect){
    const task = registry.allTasks.find(t => t.taskId === taskId)
    tagSelect.addEventListener('addItem', function(event){
      const tagId = event.detail.value
      const tag = registry.allTags.find(t => t.tagId === tagId)
      console.log(task.name, 'tagged with', event.detail.label)
      if (tag.type === 'other'){
        tagOther(taskId,tagId)
        console.log(tag)
      } else if (tag.type === 'urgency'){
        console.log('Urgency is not tagged here')
        console.log(tag)
      } else {
        console.log('something is wrong')
      }
      })
  
    tagSelect.addEventListener('removeItem', function(event){
      const tagId = event.detail.value
      const tag = registry.allTags.find(t => t.tagId === tagId)
      console.log(event.detail.value, 'tag removed from', task.name)
      if (tag.type === 'other'){
        removeTag(taskId,tagId)
        console.log(tag)
      } else if (tag.type === 'urgency'){
        console.log('Urgency is not handled here')
        console.log(tag)
      } else {
        console.log('something is wrong')
      }
      })
  }

const projectDetailsState = {
  latestProjectId: null,
  selectedProjectId: null,
  isCreatingNewProj: false, 
}

function loadProjectDetailsHandler(){
  const addProjBtn = document.querySelector('.add-project')
  addProjBtn.addEventListener('click', addProjBtnSequence)

  const saveBtn = document.querySelector('.save-project')
  saveBtn.addEventListener('click', saveProjBtnSequence)


  const cancelBtn = document.querySelector('.cancel-changes')
  cancelBtn.addEventListener('click', cancelBtnSequence)
}

function loadProjectSelectEventListeners(){
  const projects = document.querySelectorAll('.project')
  projects.forEach(project => {
    project.addEventListener('click', () => {
      selectProj(project.dataset.projectId,project.textContent)
    })
  });
}

function addProjBtnSequence(){
    projectDetailsState.isCreatingNewProj = true
    disableProjectSelect()
    clearProjectDetailsUI()
    toggleAddProjectBtn()
    const projDetailsDiv = document.querySelector('.project-details')
    if (getComputedStyle(projDetailsDiv).display === 'none'){
      toggleProjectDetails()
    }
    projectDetailsState.latestProjectId = addProject()
    projectDetailsState.selectedProjectId = projectDetailsState.latestProjectId
    const proj = registry.allProjects.find(p => p.projectId === projectDetailsState.latestProjectId)
    console.table(proj)
}

function saveProjBtnSequence(){
  toggleProjectDetails()
  saveProjDetails(projectDetailsState.selectedProjectId)
  const proj = registry.allProjects.find(p => p.projectId === projectDetailsState.selectedProjectId)
  console.table(proj)
  htmlGenerator.generateProjectList(registry.allProjects)
  if (projectDetailsState.isCreatingNewProj){
    toggleAddProjectBtn()
  }
  projectDetailsState.isCreatingNewProj = false
  enableProjectSelect()
}

function cancelBtnSequence(){
  toggleProjectDetails()
  if (projectDetailsState.isCreatingNewProj){
    deleteProject(projectDetailsState.latestProjectId)
    toggleAddProjectBtn()
    console.table(registry.allProjects)
  }
  projectDetailsState.isCreatingNewProj = false
  enableProjectSelect()
}

function selectProj(projId,projName){
  if (projectDetailsState.isCreatingNewProj){ //disables when creating project
    return
  } else {
    const projDetailsDiv = document.querySelector('.project-details')
    projectDetailsState.selectedProjectId = projId
    console.log(projectDetailsState.selectedProjectId)
    if (projDetailsDiv.style.display = 'none'){
      toggleProjectDetails()
    }
    printProjDetailsInUI(projId)
  }
}

//UI only disable, actual disable happens on the select function
function disableProjectSelect(){
  const projects = document.querySelectorAll('.project')
  projects.forEach(project => {
    project.style.cursor = 'default'
  });
}

function enableProjectSelect(){
  const projects = document.querySelectorAll('.project')
  projects.forEach(project => {
    project.style.cursor = 'cursor'
  });
}

function printProjDetailsInUI(projId){
  const proj = registry.allProjects.find(p => p.projectId === projId)
  const projName = document.querySelector('input.project-details-header')
  const projDescription = document.querySelector('#project-description')
  projName.value = proj.name
  externalLibraries.flatpickrInstances.startDate.setDate(proj.startDate)
  externalLibraries.flatpickrInstances.endDate.setDate(proj.endDate)
  projDescription.value = proj.description
}

function toggleProjectDetails(){
  
  const projDetailsDiv = document.querySelector('.project-details')
  if (getComputedStyle(projDetailsDiv).display === 'none'){
    projDetailsDiv.style.display = 'block'
  } else if (getComputedStyle(projDetailsDiv).display === 'block'){
    projDetailsDiv.style.display = 'none'
  } else {
    
    console.log('may mali')
  }
}

function toggleAddProjectBtn(){
  const addProjBtn = document.querySelector('.add-project')
  addProjBtn.disabled = !addProjBtn.disabled
}



function clearProjectDetailsUI(){
  const projName = document.querySelector('input.project-details-header')
  const projDescription = document.querySelector('#project-description')
  projName.value =''
  externalLibraries.flatpickrInstances.startDate.clear()
  externalLibraries.flatpickrInstances.endDate.clear()
  projDescription.value =''
}
function saveProjDetails(projId){
  const projChangesObj = createProjChangesObj()
  editProject(projId, projChangesObj)
}


function createProjChangesObj(){
  const projName = document.querySelector('input.project-details-header')
  const startDate = document.querySelector('input#start-date')
  const endDate = document.querySelector('input#end-date')
  const projDescription = document.querySelector('#project-description')
  
  const changes = {};

  if (startDate.value !== '' && endDate.value !== ''){
      changes.name =  projName.value
      changes.startDate = new Date(startDate.value).toISOString()
      changes.endDate = new Date(endDate.value).toISOString()
      changes.description = projDescription.value
  } else {
      changes.name =  projName.value
      changes.description = projDescription.value
  }
  console.table(changes)
  return changes
}

function createInitialProjDetailsObj(){
  const projName = document.querySelector('input.project-details-header')
  const startDate = document.querySelector('input#start-date')
  const endDate = document.querySelector('input#end-date')
  const projDescription = document.querySelector('#project-description')

  const initial = {
    name: projName.value,
    makeDate: new Date().toISOString(),
    startDate: new Date(startDate.value).toISOString(),
    endDate: new Date(endDate.value).toISOString(),
    description: projDescription.value,
  }
  console.table(initial)
  return initial
}

function getNewItems(oldArr,newArr,id){
  return newArr.filter(
    newItem => !oldArr.some(oldItem => oldItem[id] === newItem[id]))
}
export default {setupAddRemoveEventListenersForTask,loadProjectDetailsHandler,loadProjectSelectEventListeners}