import registry from './registry'

const filterObj = {
  isDone: false,
  timeFilter:'none',
  urgencyFilter: 'high',
  tagFilter: [],
  projectFilter: 'none',
}

// const filterObj = {
//   isDone: false,
//   timeFilter:'none',
//   urgencyFilter: 'none',
//   tagFilter: {},
// }

//Internal: takes an array of tasks and filters by ID returns filtered arr
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

  //essentially byTag filter but checks for specific for urgency
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
  //essentially byTag filter but checks for specific for other tag
function byOther(tagId,taskArray){
  const tag = registry.allTags.find(t => t.tagId === tagId)
    if (tag.type === 'other'){
        return byTag(tagId,taskArray)
    } else {
        console.log('not an other tag')
    }
}

function byProject(projectId,taskArray = registry.allTasks){
  const proj = registry.allProjects.find(p => p.projectId === projectId)
    if (proj.projectId === 'undefined'){
        console.log('Invalid project ID')
        return
    } else {
      const filteredArr = taskArray.filter(task => task.projectId.includes(projectId));
      if (filteredArr.length > 0){
        return filteredArr
      } else {
        console.log(`No task in ${proj.name}`)
      }
    }
}

function filterAll(filterObject, taskArray = registry.allTasks){
  const filterObj = filterObject
  let filteredArr = []
  if (filterObj.projectFilter != 'none'){
    
  }

  //filters for urgency first passes on a filtered array
  if (filterObj.urgencyFilter != 'none'){
    filteredArr = byUrgency(filterObj.urgencyFilter,taskArray)
  }

  //filters for tags next passes on a filtered array every loop
  if (filterObj.tagFilter.length > 0){
    for (let tagID of filterObj.tagFilter){
      console.log(tagID)
      filteredArr = byOther(tagID,filteredArr)
    }
  }

  if (filteredArr=== undefined){
    return 'NO RESULTS'
  } else {
    console.log(filteredArr)
    return filteredArr
  }
}
export default {byUrgency,byOther,filterObj,filterAll,byProject}