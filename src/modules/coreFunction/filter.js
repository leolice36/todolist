import registry from './registry'
import { subDays, addDays, formatISO, parseISO, isToday, isTomorrow, isThisWeek, isThisMonth, isPast } from 'date-fns';

// const filterObj = {
//   isDone: false,
//   timeFilter:
//   {
//     period: 'tomorrow',
//     dateType: 'doDate'
//   },
//   urgencyFilter: 'none',
//   tagFilter: [],
//   projectFilter: 'none',
// }

const filterObj = {
  isDone: 'none',
  timeFilter:'none',
  urgencyFilter: 'none',
  tagFilter: [],
  projectFilter: 'none',
}

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


function byDate(period,dateType,arrayOfTasks = registry.allTasks){
  let filteredArr;
  switch (period){
      case 'today':
          filteredArr = arrayOfTasks.filter(task => {
            if (task[dateType]){
              return isToday(parseISO(task[dateType]))  
              }
            });
          break
      case 'tomorrow':
          filteredArr = arrayOfTasks.filter(task => {
            if (task[dateType]){
            return isTomorrow(parseISO(task[dateType]))
            }
          });
          break
      case 'thisWeek':
          filteredArr = arrayOfTasks.filter(task => {
            if (task[dateType]){
              return isThisWeek(parseISO(task[dateType]), { weekStartsOn: 1 })
            }
          }
          ); // Monday start
          break
      case 'thisMonth':
          filteredArr = arrayOfTasks.filter(task => {
            if (task[dateType]){
            return isThisMonth(parseISO(task[dateType]))
            }
          });
          break
      case 'past':
          filteredArr = arrayOfTasks.filter(task => {
            if (task[dateType]){
            return isPast(parseISO(task[dateType]))
            }
          });
          break
  } 
  
  if (filteredArr.length > 0){
    return filteredArr
  } else if (filteredArr.length == 0){
    return 'NO RESULTS'
  } else {
    return "something might be wrong"
  }
}

function byIsDone(taskArray = registry.allTasks, condition){
  const filteredArr = taskArray.filter(task => task.isDone === condition);
    if (filteredArr.length > 0){
      return filteredArr
    } else {
      console.log(`Nothing DONE`)
    }
}
function filterAll(filterObject, taskArray = registry.allTasks){
  const filterObj = filterObject
  let filteredArr = taskArray
  if (filterObj.projectFilter != 'none'){
    filteredArr = byProject(filterObj.projectFilter,taskArray)
  }
  // filters for urgency first passes on a filtered array
  if (filterObj.urgencyFilter != 'none'){
    filteredArr = byUrgency(filterObj.urgencyFilter,filteredArr)
  }
  // filters for tags next passes on a filtered array every loop
  if (filterObj.tagFilter.length > 0){
    for (let tagID of filterObj.tagFilter){
      filteredArr = byOther(tagID,filteredArr)
    }
  }
  if (filterObj.timeFilter != 'none'){
    filteredArr = byDate(filterObj.timeFilter.period, filterObj.timeFilter.dateType,filteredArr)
  }

  if (filterObj.isDone != 'none'){
    filteredArr = byIsDone(filteredArr,filterObj.isDone)
  }

  if (filteredArr === undefined || filteredArr.length <= 0){
    return 'NO RESULTS'
  } else {
    return filteredArr
  }
}

export default {byUrgency,byOther,filterObj,filterAll,byProject,byDate}