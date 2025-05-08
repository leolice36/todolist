import registry from './registry'
import { subDays, addDays, formatISO, parseISO, isToday, isTomorrow, isThisWeek, isThisMonth, isPast } from 'date-fns';

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


function byDate(period,dateType,arrayOfTasks = registry.allTasks){
  let filteredArr;
  switch (period){
      case 'today':
          filteredArr = arrayOfTasks.filter(task => isToday(parseISO(task[dateType])));
          break
      case 'tomorrow':
          filteredArr = arrayOfTasks.filter(task => isTomorrow(parseISO(task[dateType])));
          break
      case 'thisWeek':
          filteredArr = arrayOfTasks.filter(task => isThisWeek(parseISO(task[dateType]), { weekStartsOn: 1 })); // Monday start
          break
      case 'thisMonth':
          filteredArr = arrayOfTasks.filter(task => isThisMonth(parseISO(task[dateType])));
          break
      case 'past':
          filteredArr = arrayOfTasks.filter(task => isPast(parseISO(task[dateType])));
          break
  } 
  if (filteredArr.length > 0){
    return filteredArr
  } else if (filteredArr.length === 0){
    return 'NO RESULTS'
  } else {
    return "something might be wrong"
  }
}


function filterAll(filterObject, taskArray = registry.allTasks){
  const filterObj = filterObject
  let filteredArr = []
  if (filterObj.projectFilter != 'none'){
    filteredArr = byProject(filterObj.projectFilter,taskArray)
  }

  //filters for urgency first passes on a filtered array
  if (filterObj.urgencyFilter != 'none'){
    filteredArr = byUrgency(filterObj.urgencyFilter,filteredArr)
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
const tasksArr = [
  {
    isDone: false,
    projectId: 1,
    name: "Submit assignment",
    makeDate: "2025-04-28T00:00:00.000Z", 
    doDate: "2025-05-08T00:00:00.000Z",   // today
    dueDate: "2025-05-08T00:00:00.000Z",  // today
    description: "Finish and submit course assignment.",
    tags: [],
    taskId: "uuid-1",
    color: ""
  },
  {
    isDone: false,
    projectId: 1,
    name: "Call plumber",
    makeDate: "2025-05-06T00:00:00.000Z",
    doDate: "2025-05-09T00:00:00.000Z",   // tomorrow
    dueDate: "2025-05-09T00:00:00.000Z",  // tomorrow
    description: "Fix the leaking sink.",
    tags: [],
    taskId: "uuid-2",
    color: ""
  },
  {
    isDone: false,
    projectId: 2,
    name: "Grocery run",
    makeDate: "2025-05-02T00:00:00.000Z",
    doDate: "2025-05-10T00:00:00.000Z",   // this week
    dueDate: "2025-05-10T00:00:00.000Z",  // this week
    description: "Buy vegetables and snacks.",
    tags: [],
    taskId: "uuid-3",
    color: ""
  },
  {
    isDone: false,
    projectId: 2,
    name: "Clean garage",
    makeDate: "2025-05-01T00:00:00.000Z",
    doDate: "2025-05-11T00:00:00.000Z",   // this week
    dueDate: "2025-05-11T00:00:00.000Z",  // this week
    description: "Spring cleaning project.",
    tags: [],
    taskId: "uuid-4",
    color: ""
  },
  {
    isDone: false,
    projectId: 3,
    name: "Write report",
    makeDate: "2025-05-03T00:00:00.000Z",
    doDate: "2025-05-18T00:00:00.000Z",   // this month
    dueDate: "2025-05-18T00:00:00.000Z",  // this month
    description: "Annual performance report.",
    tags: [],
    taskId: "uuid-5",
    color: ""
  },
  {
    isDone: false,
    projectId: 3,
    name: "Plan event",
    makeDate: "2025-05-04T00:00:00.000Z",
    doDate: "2025-05-23T00:00:00.000Z",   // this month
    dueDate: "2025-05-23T00:00:00.000Z",  // this month
    description: "Prepare for company offsite.",
    tags: [],
    taskId: "uuid-6",
    color: ""
  },
  {
    isDone: false,
    projectId: 4,
    name: "Prepare slides",
    makeDate: "2025-05-05T00:00:00.000Z",
    doDate: "2025-06-01T00:00:00.000Z",   // next month
    dueDate: "2025-06-01T00:00:00.000Z",  // next month
    description: "Slides for June presentation.",
    tags: [],
    taskId: "uuid-7",
    color: ""
  },
  {
    isDone: false,
    projectId: 4,
    name: "Trip to dentist",
    makeDate: "2025-05-06T00:00:00.000Z",
    doDate: "2025-06-06T00:00:00.000Z",   // next month
    dueDate: "2025-06-06T00:00:00.000Z",  // next month
    description: "Dental cleaning appointment.",
    tags: [],
    taskId: "uuid-8",
    color: ""
  },
  {
    isDone: true,
    projectId: 1,
    name: "Old invoice",
    makeDate: "2025-03-15T00:00:00.000Z",
    doDate: "2025-04-01T00:00:00.000Z",   // past
    dueDate: "2025-04-02T00:00:00.000Z",  // past
    description: "Sent to finance last month.",
    tags: [],
    taskId: "uuid-9",
    color: ""
  },
  {
    isDone: false,
    projectId: 2,
    name: "Buy concert tickets",
    makeDate: "2025-05-07T00:00:00.000Z",
    doDate: "2025-05-09T00:00:00.000Z",   // tomorrow
    dueDate: "2025-05-09T00:00:00.000Z",  // tomorrow
    description: "Pre-sale opens.",
    tags: [],
    taskId: "uuid-10",
    color: ""
  }
];

export default {byUrgency,byOther,filterObj,filterAll,byProject,byDate,tasksArr}