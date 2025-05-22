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

function toCamelCase(str) {
  return str
    .split(' ')                   // Split by spaces
    .map((word, index) => {
      if (index === 0) {
        // Lowercase the first word
        return word.charAt(0).toLowerCase() + word.slice(1);
      }
      // Capitalize the rest
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

function emptyObject(obj){
  Object.keys(obj).forEach(key => delete obj[key]);

}

export default {emptyObject,getUrgencyTags,findTaskObj,getTaskObj,getProjObj,getOtherTags,toCamelCase}