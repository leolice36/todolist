import registry from '../modules/coreFunction/registry'
import {removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../modules/coreFunction/basicFunction"
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import uiInteractions from './uiInteractions';
function generateTagSectionInTask(tagsArr,taskId){
   console.log(taskId)
  const tagSelect = document.createElement('select');
  tagSelect.id = 'tag-select';
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

  document.body.appendChild(tagSelect)

  const choices = new Choices('#tag-select', {
    removeItemButton: true,
    shouldSort: false,
    searchEnabled: true,
  });

  uiInteractions.setupAddRemoveEventListeners(taskId,tagSelect)
}
  
export default {generateTagSectionInTask}