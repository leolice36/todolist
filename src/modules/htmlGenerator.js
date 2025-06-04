import registry from '../modules/coreFunction/registry'
import {removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../modules/coreFunction/basicFunction"
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import projectSection from './uiInteractions/projectSection';
import { generateDefaults } from './coreFunction/defaultObjs';
import externalLibraries from './externalLibraries';
import taskSection from './uiInteractions/taskSection';
import randomUtilities from './randomUtilities';
import filterSection from './uiInteractions/filterSection';
import filter from './coreFunction/filter';


function startUp(){ 
  generateTagSectionInTask(registry.allTags)
  generateUrgencySectionInTask()
  generateTagSectionInFIlter(registry.allTags)
  generateUrgencySectionInFilter()
  generateProjectList(registry.allProjects)
  generateTaskList(registry.allTasks)
  externalLibraries.initializeFlatpickr()
  externalLibraries.initializeEasyToggle()
  externalLibraries.initializeChoicesJs()
  projectSection.loadProjectDetailsHandler()
  projectSection.loadAllProjectsEventListeners()
  filterSection.loadFilterHandlers()
  taskSection.loadTaskDetailsHandler()
}

function generateTagSectionInTask(tagsArr){

  const tagSelect = document.createElement('select');
  tagSelect.id = 'tag-select-task';
  tagSelect.multiple = true;
  // tagsArr.forEach(tag => {
  //   if (tag.type === 'other'){
  //     const option = document.createElement('option')
  //     option.textContent = tag.name
  //     option.value = tag.tagId
  //     tagSelect.appendChild(option)
  //   }
  // });
  const tagsArea = document.querySelector('.tags-area-task')
  tagsArea.appendChild(tagSelect)

  //need to decouple the tagging 
  // uiInteractions.setupAddRemoveEventListenersForTask(taskId,tagSelect)
}
function generateUrgencySectionInTask(){
  const urgencySelect = document.createElement('select');
  urgencySelect.id = 'urgency-select';

  const urgencyLevel = document.querySelector('.urgency-level')
  urgencyLevel.appendChild(urgencySelect)

  // uiInteractions.setupAddRemoveEventListenersForTask(taskId,urgencySelect)

}

function generateTagSectionInFIlter(tagsArr){
  const tagSelect = document.createElement('select');
  tagSelect.id = 'tag-select-filter';
  tagSelect.multiple = true;

  tagsArr.forEach(tag => {
    if (tag.type === 'other'){
      const option = document.createElement('option')
      option.textContent = tag.name
      option.value = tag.tagId
      tagSelect.appendChild(option)
    }
  });
  const tagsArea = document.querySelector('.tags-area-filter')
  tagsArea.appendChild(tagSelect)


  //add setup event listener here
  // filterSection.setupAddRemoveEventListenersForFilter(tagSelect)
}

function generateUrgencySectionInFilter(){
  const urgencySelect = document.createElement('select');
  urgencySelect.id = 'urgency-select-filter';
  const noneOption = document.createElement('option');
  noneOption.value = '';
  noneOption.textContent = 'None';
  urgencySelect.insertBefore(noneOption, urgencySelect.firstChild);
  const urgencyLevel = document.querySelector('.urgency-level-filter')
  urgencyLevel.appendChild(urgencySelect)
  // uiInteractions.setupAddRemoveEventListenersForTask(taskId,urgencySelect)

}

function generateProjectList(projectsArr){
    const projectList = document.querySelector('.project-list')
    projectList.innerHTML='' //reset
    projectsArr.forEach(project => {
        const projEntryContainer = document.createElement('div')
        const svgContainer = document.createElement('div')
        const projectDiv = document.createElement('div')
        projEntryContainer.classList.add('entry-container')
        svgContainer.classList.add('svg-container')
        svgContainer.innerHTML = `<svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2.5" cy="2.5" r="2.5" fill="#512EAB"/>
          </svg>`

        projectDiv.textContent = project.name
        projectDiv.dataset.projectId = project.projectId
        projectDiv.classList.add('project') 
        projEntryContainer.appendChild(svgContainer)
        projEntryContainer.appendChild(projectDiv)
        projectList.appendChild(projEntryContainer)
    })
    document.addEventListener("DOMContentLoaded", projectSection.loadProjectSelectEventListeners())
}

function generateTaskList(tasksArr){
    const tasksList = document.querySelector('.task-list')
    tasksList.innerHTML='' //reset
    console.log(tasksArr)
    const noResults = document.querySelector('.no-results')

    if(tasksArr == 'NO RESULTS'){
      noResults.style.display = 'flex'
    } else if (tasksArr.length > 0 && tasksArr != 'NO RESULTS'){
      noResults.style.display = 'none'
      tasksArr.forEach(task => {
          const taskDivContainer = document.createElement('div')
          const taskDiv = document.createElement('div')
          const checkbox = document.createElement('input')
          taskDivContainer.classList.add('task-container')
          checkbox.type = 'checkbox'
          checkbox.classList.add('is-done')
          checkbox.checked = task.isDone
          checkbox.dataset.taskId = task.taskId
          taskSection.initializeCheckBoxEventlistener(checkbox)
          taskDiv.textContent = task.name
          taskDiv.dataset.taskId = task.taskId
          taskDiv.classList.add('task') 
          taskDivContainer.appendChild(taskDiv)
          taskDivContainer.appendChild(checkbox)
          tasksList.appendChild(taskDivContainer)
      })
      document.addEventListener("DOMContentLoaded", taskSection.loadTaskSelectEventListeners())
    }
}

export default {generateTagSectionInTask,generateTagSectionInFIlter,generateProjectList,generateTaskList,startUp}