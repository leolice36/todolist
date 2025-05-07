import "./styles.css"
import registry from '../modules/coreFunction/registry'
import {generateDefaults} from '../modules/coreFunction/defaultObjs'
import {addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../modules/coreFunction/basicFunction"
import testScript from './test'
// generateDefaults()

import { parseISO, isToday, isTomorrow, isThisWeek, isThisMonth, isPast } from 'date-fns';

console.table(testScript.tasksArr)


function byDate(period,dateType,arrayOfTasks){
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
    return filteredArr
}

const testFiltered = byDate('thisMonth','makeDate',testScript.tasksArr)
console.table(testFiltered)












// const tasks = [
//     // Tasks for today (assuming today is 2025-05-08)
//     { name: "Pay rent", dueDate: "2025-05-08T09:00:00Z" },
//     { name: "Send report", dueDate: "2025-05-08T16:00:00Z" },
  
//     // Task for tomorrow (2025-05-09)
//     { name: "Doctor appointment", dueDate: "2025-05-09T11:00:00Z" },
  
//     // Later this week (Saturday if week starts Monday)
//     { name: "Buy groceries", dueDate: "2025-05-10T14:00:00Z" },
//     { name: "Call plumber", dueDate: "2025-05-11T10:00:00Z" },
  
//     // Next week (outside this week)
//     { name: "Team meeting", dueDate: "2025-05-13T10:00:00Z" },
  
//     // Later this month
//     { name: "Birthday party", dueDate: "2025-05-21T18:00:00Z" },
//     { name: "Finish project", dueDate: "2025-05-30T12:00:00Z" },
  
//     // Outside this month
//     { name: "Vacation starts", dueDate: "2025-06-02T07:00:00Z" },
//     { name: "Course enrollment", dueDate: "2025-04-30T12:00:00Z" },
//   ];
  
  

  
// const todayTasks = tasks.filter(task => isToday(parseISO(task.dueDate)));

// const tomorrowTasks = tasks.filter(task => isTomorrow(parseISO(task.dueDate)));

// const thisWeekTasks = tasks.filter(task => isThisWeek(parseISO(task.dueDate), { weekStartsOn: 1 })); // Monday start

// const thisMonthTasks = tasks.filter(task => isThisMonth(parseISO(task.dueDate)));

// console.table(thisMonthTasks)