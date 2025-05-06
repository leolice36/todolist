import registry from './registry'

const filterObj = {
  isDone: false,
  timeFilter:'none',
  urgencyFilter: 'none',
  tagFilter: {},
}

//Internal
function byTag(tagId, taskArray = registry.allTasks) {
  console.table(taskArray)
  const tag = registry.allTags.find(t => t.tagId === tagId)
  const filteredArr = taskArray.filter(task => task.tags.includes(tagId));
    if (filteredArr.length > 0){
      return filteredArr
    } else {
      console.log(`Nothing tagged with ${tag.name}`)
    }
  }

function byUrgency(tagId, taskArray){
  const tag = registry.allTags.find(t => t.tagId === tagId)
    if (tag.type === 'urgency'){
      switch (tagId){
        case 'low':
          
          return byTag('low',taskArray)
          
        case 'medium':
          return byTag('medium',taskArray)
          
        case 'high':
          return byTag('high',taskArray)
          
        default:
          console.log('not HML')
      }
    } else {
        console.log('not an urgency tag')
    }
}

function byOther(tagId,taskArray){
  const tag = registry.allTags.find(t => t.tagId === tagId)
    if (tag.type === 'other'){
        return byTag(tagId,taskArray)
    } else {
        console.log('not an other tag')
    }
}


export default {byUrgency,byOther,filterObj}