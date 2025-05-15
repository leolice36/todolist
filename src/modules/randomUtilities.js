import registry from "./coreFunction/registry"

//unused for now, might need later.
function getNewItems(oldArr,newArr,id){
    return newArr.filter(
      newItem => !oldArr.some(oldItem => oldItem[id] === newItem[id]))
  }

function getUrgencyTags(){
  const urgencyTags =  registry.allTags.filter(tag => tag.type === 'urgency')
  console.table(urgencyTags)
  return urgencyTags
}

function getOtherTags(){
  const otherTags =  registry.allTags.filter(tag => tag.type === 'other')
  console.table(otherTags)
  return otherTags
}

function findTaskObj(taskId){
  const task = registry.allTasks.find(task => task.taskId === taskId)
  return task
}

function getTaskObj(taskId){
  return registry.allTasks.find(task => task.taskId === taskId)
}

function getProjObj(projId){
  return registry.allProjects.find(proj => proj.projectId === projId)
}
export default {getUrgencyTags,findTaskObj,getTaskObj,getProjObj,getOtherTags}