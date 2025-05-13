import registry from '../modules/coreFunction/registry'
import {removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../modules/coreFunction/basicFunction"
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import { format } from "date-fns"
import externalLibraries from './externalLibraries';

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
let latestProjectId;
let selectedProject;

function loadProjectDetailsHandler(){
  const addProjBtn = document.querySelector('.add-project')
  addProjBtn.addEventListener('click', addProjectButtonSequence)

  const saveBtn = document.querySelector('.save-project')
  saveBtn.addEventListener('click', () => {
    toggleProjectDetails()
    saveProjDetails(selectedProject)
    const proj = registry.allProjects.find(p => p.projectId === selectedProject)
    console.table(proj)
    toggleAddProjectBtn()
  })


  const cancelBtn = document.querySelector('.cancel-changes')
  cancelBtn.addEventListener('click', () => {
    toggleProjectDetails()
  })
}

function addProjectButtonSequence(){
    clearProjectDetailsUI()
    toggleAddProjectBtn()
    toggleProjectDetails()
    latestProjectId = addProject()
    selectedProject = latestProjectId
    const proj = registry.allProjects.find(p => p.projectId === latestProjectId)
    console.table(proj)
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

function getNewItems(oldArr,newArr,id){
  return newArr.filter(
    newItem => !oldArr.some(oldItem => oldItem[id] === newItem[id]))
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

  const changes = {
    name: projName.value,
    makeDate: new Date().toISOString(),
    startDate: new Date(startDate.value).toISOString(),
    endDate: new Date(endDate.value).toISOString(),
    description: projDescription.value,
  }
  console.table(changes)
  return changes
}
export default {setupAddRemoveEventListenersForTask,loadProjectDetailsHandler}