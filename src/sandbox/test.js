import registry from '../modules/coreFunction/registry'
import {removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../modules/coreFunction/basicFunction"


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

  setupAddRemoveEventListeners(taskId,tagSelect)
}

function setupAddRemoveEventListeners(taskId,tagSelect){
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
  
export default {generateTagSectionInTask}