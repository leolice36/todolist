import registry from '../coreFunction/registry'
import {deleteProject, removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../coreFunction/basicFunction"
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";
import { format } from "date-fns"
import externalLibraries from '../externalLibraries';
import htmlGenerator from '../htmlGenerator';

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

export default {setupAddRemoveEventListenersForTask}