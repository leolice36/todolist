import registry from '../modules/coreFunction/registry'
import {addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../modules/coreFunction/basicFunction"




function generateTagSectionInTask(tagsArr,taskId){
  const task = registry.allTasks.find(t => t.taskId === taskId)
  console.log(taskId)
  const tagSelect = document.createElement('select');
  tagSelect.id = 'tag-select';
  tagSelect.multiple = true;
  console.table(tagsArr) 

  tagsArr.forEach(tag => {
    const option = document.createElement('option')
    option.textContent = tag.name
    option.value = tag.tagId
    tagSelect.appendChild(option)
  });

  document.body.appendChild(tagSelect)

  tagSelect.addEventListener('addItem', function(event){
    const tagId = event.detail.value
    const tag = registry.allTags.find(t => t.tagId === tagId)
    console.log(task.name, 'tagged with', event.detail.label)
    if (tag.type === 'other'){
      tagOther(taskId,tagId)
      console.log(tag)
    }
    })

  tagSelect.addEventListener('removeItem', function(event){
    console.log(event.detail.value, 'tag removed from', task.name)
    })
}
  
export default {generateTagSectionInTask}