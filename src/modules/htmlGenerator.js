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
    tasksArr.forEach(task => {
        const taskDiv = document.createElement('div')
        taskDiv.textContent = task.name
        taskDiv.dataset.taskId = task.taskId
        taskDiv.classList.add('task') 
        tasksList.appendChild(taskDiv)
    })
    document.addEventListener("DOMContentLoaded", taskSection.loadTaskSelectEventListeners())
}

export default {generateTagSectionInTask,generateTagSectionInFIlter,generateProjectList,generateTaskList,startUp}