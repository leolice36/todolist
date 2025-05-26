import registry from '../modules/coreFunction/registry'
import {removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../modules/coreFunction/basicFunction"
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import uiInteractions from './uiInteractions/uiInteractions';
import projectSection from './uiInteractions/projectSection';
import { generateDefaults } from './coreFunction/defaultObjs';
import externalLibraries from './externalLibraries';
import taskSection from './uiInteractions/taskSection';
import randomUtilities from './randomUtilities';
import filterSection from './uiInteractions/filterSection';
import filter from './coreFunction/filter';


function startUp(){
  
  generateDefaults()
  generateTagSectionInTask(registry.allTags,'task-2')
  generateUrgencySectionInTask('task-2')
  generateTagSectionInFIlter(registry.allTags)
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

function generateProjectList(projectsArr){
    const projectList = document.querySelector('.project-list')
    projectList.innerHTML='' //reset
    projectsArr.forEach(project => {
        const projectDiv = document.createElement('div')
        projectDiv.textContent = project.name
        projectDiv.dataset.projectId = project.projectId
        projectDiv.classList.add('project') 
        projectList.appendChild(projectDiv)
    })
    document.addEventListener("DOMContentLoaded", projectSection.loadProjectSelectEventListeners())
}

function generateTaskList(tasksArr){
    const tasksList = document.querySelector('.task-list')
    tasksList.innerHTML='' //reset
    console.log(tasksArr)
    if (tasksArr.length > 0 && tasksArr != 'NO RESULTS'){
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