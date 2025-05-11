import registry from '../modules/coreFunction/registry'
import {removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../modules/coreFunction/basicFunction"
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import uiInteractions from './uiInteractions';


function generateTagSectionInTask(tagsArr,taskId){
    console.log(taskId)
  const tagSelect = document.createElement('select');
  tagSelect.id = 'tag-select-task';
  tagSelect.multiple = true;
  console.table(tagsArr) 

  tagsArr.forEach(tag => {
    if (tag.type === 'other'){
      const option = document.createElement('option')
      option.textContent = tag.name
      option.value = tag.tagId
      tagSelect.appendChild(option)
    }
  });
  const tagsArea = document.querySelector('.tags-area-task')
  tagsArea.appendChild(tagSelect)
  console.log(tagsArea)

  const choices = new Choices('#tag-select-task', {
    removeItemButton: true,
    shouldSort: false,
    searchEnabled: true,
  });

  uiInteractions.setupAddRemoveEventListenersForTask(taskId,tagSelect)
}

function generateTagSectionInFIlter(tagsArr){
  const tagSelect = document.createElement('select');
  tagSelect.id = 'tag-select-filter';
  tagSelect.multiple = true;
  console.table(tagsArr) 

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
  console.log(tagsArea)

  const choices = new Choices('#tag-select-filter', {
    removeItemButton: true,
    shouldSort: false,
    searchEnabled: true,
  });

  //Attach to filter object via event listeners 
}

function generateProjectList(projectsArr){
    const projectList = document.querySelector('.project-list')
    console.table(projectsArr)
    projectsArr.forEach(project => {
        const projectDiv = document.createElement('div')
        projectDiv.textContent = project.name
        projectDiv.dataset.projectId = project.projectId
        projectDiv.classList.add('project') 
        projectList.appendChild(projectDiv)
    })
}

function generateTaskList(tasksArr){
    const tasksList = document.querySelector('.task-list')
    console.table(tasksArr)
    tasksArr.forEach(task => {
        const taskDiv = document.createElement('div')
        taskDiv.textContent = task.name
        taskDiv.dataset.taskId = task.taskId
        taskDiv.classList.add('task') 
        tasksList.appendChild(taskDiv)
    })
}
export default {generateTagSectionInTask,generateTagSectionInFIlter,generateProjectList,generateTaskList}