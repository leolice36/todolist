import registry from "../coreFunction/registry";
import {deleteProject, removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../coreFunction/basicFunction"
import "choices.js/public/assets/styles/choices.min.css";
import externalLibraries from '../externalLibraries';
import htmlGenerator from '../htmlGenerator';
import taskSection from "./taskSection";
import filter from "../coreFunction/filter";
import localStorageManager from "../localStorageManager";
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

    const deleteBtn = document.querySelector('.delete-project')
    deleteBtn.addEventListener('click', deleteProjBtnSequence)

    const confirmDeleteBtn = document.querySelector('.confirm-delete-project')
    confirmDeleteBtn.addEventListener('click', confirmDeleteBtnSequence)

    const cancelDeleteBtn = document.querySelector('.cancel-delete-project')
    cancelDeleteBtn.addEventListener('click', cancelDeleteBtnSequence)
  }
  
  function loadProjectSelectEventListeners(){
    const projects = document.querySelectorAll('.project')
    projects.forEach(project => {
      project.addEventListener('click', () => {
        selectProj(project.dataset.projectId,project.textContent)
      })
    });
  }

  function loadAllProjectsEventListeners(){
    const allProjects = document.querySelector('.all-projects-container')
    allProjects.addEventListener('click', showAllProjects)
  }

  function showAllProjects(){
    console.log('ALL PROJECTS')
      const projDetailsDiv = document.querySelector('.project-details')
      const detailsContainer = document.querySelector('.task-details-container')
      if (getComputedStyle(detailsContainer).display === 'block'){
        taskSection.toggleTaskDetails()
      }
      if (getComputedStyle(projDetailsDiv).display === 'block'){toggleProjectDetails()}
      projectDetailsState.selectedProjectId = null
      taskSection.tasksStateObj.selectedTask = null
      console.log(projectDetailsState.selectedProjectId)
      updateProjIdInFilterObj('none')
      taskSection.printFilteredTasks()
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
    const taskDetailsContainer = document.querySelector('.task-details-container')
    console.table(proj)
    htmlGenerator.generateProjectList(registry.allProjects)
    if (projectDetailsState.isCreatingNewProj){
      toggleAddProjectBtn()
    }
    projectDetailsState.isCreatingNewProj = false

    if (getComputedStyle(taskDetailsContainer).display === 'block'){
      taskSection.toggleTaskDetails()
    }
    
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

  function deleteProjBtnSequence(){
    console.log('DELETE PROJ')
    toggleDeleteProjectModal()
    toggleDeleteBtn()
    
  }
  function confirmDeleteBtnSequence(){
    toggleDeleteProjectModal()
    deleteProject(projectDetailsState.selectedProjectId)
    projectDetailsState.selectedProjectId = null
    const detailsContainer = document.querySelector('.project-details')
    const deleteBtn = document.querySelector('.delete-project')
    if (getComputedStyle(detailsContainer).display === 'block'){
      toggleProjectDetails()
    }
    if (deleteBtn.disabled){
      toggleDeleteBtn()
    }
    htmlGenerator.generateProjectList(registry.allProjects)
    showAllProjects()
  }

  function cancelDeleteBtnSequence(){
    console.log('NAH')
    toggleDeleteProjectModal()
    toggleDeleteBtn()
  }

  function toggleDeleteProjectModal(){
    const deleteProjectModal = document.querySelector('.project-delete-modal')
    if (getComputedStyle(deleteProjectModal).display === 'none'){
      deleteProjectModal.style.display = 'flex'
    } else if (getComputedStyle(deleteProjectModal).display === 'flex'){
      deleteProjectModal.style.display = 'none'
    } else {
      console.log('may mali')
    }
  }
  function toggleDeleteBtn(){
    const deleteBtn = document.querySelector('.delete-project')
    deleteBtn.disabled = !deleteBtn.disabled
  }

  function selectProj(projId,projName){
    if (projectDetailsState.isCreatingNewProj){ //disables when creating project
      return
    } else {
      const projDetailsDiv = document.querySelector('.project-details')
      const taskDetailsDiv = document.querySelector('.task-details-container')
      const deleteTaskModal = document.querySelector('.task-delete-modal')
      const createTagDiv = document.querySelector('.create-tag-container')
      const tags = document.querySelector('.tags-sub')
      projectDetailsState.selectedProjectId = projId
      taskSection.tasksStateObj.selectedTask = null
      console.log(projectDetailsState.selectedProjectId)
      if (projDetailsDiv.style.display = 'none'){
        toggleProjectDetails()
      }
      if(taskDetailsDiv.style.display = 'block'){
        taskSection.toggleTaskDetails()
      }
      if (getComputedStyle(deleteTaskModal).display === 'flex'){
        taskSection.toggleDeleteTaskModal()
      }
      if (getComputedStyle(createTagDiv).display === 'flex' && getComputedStyle(tags).display === 'none'){
        taskSection.toggleCreateTagDiv()
      }
      printProjDetailsInUI(projId)
      updateProjIdInFilterObj(projId)
      taskSection.printFilteredTasks()
    }
  }
  
  function updateProjIdInFilterObj(projId){
    filter.filterObj.projectFilter = projId
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

      project.style.cursor = 'pointer'

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
    localStorageManager.saveData()
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
//might use later but right now it's not needed because details is reprinted every select so retaining the original state happens naturally
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
  export default {loadProjectDetailsHandler,loadProjectSelectEventListeners,loadAllProjectsEventListeners,projectDetailsState,selectProj}