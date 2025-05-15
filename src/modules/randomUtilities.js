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
export default {getUrgencyTags}