import "./styles/styles"
import {Project, Task, Tag} from './modules/coreFunction/classes'
import registry from './modules/coreFunction/registry'
import {generateDefaults} from './modules/coreFunction/defaultObjs'
import {addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "./modules/coreFunction/basicFunction"
import filter from './modules/coreFunction/filter'
import { subDays, addDays, formatISO, parseISO, isToday, isTomorrow, isThisWeek, isThisMonth, isPast } from 'date-fns';
import htmlGenerator from "./modules/htmlGenerator"
generateDefaults()
htmlGenerator.generateTagSectionInTask(registry.allTags,'task-1')
htmlGenerator.generateTagSectionInFIlter(registry.allTags)
htmlGenerator.generateProjectList(registry.allProjects)
htmlGenerator.generateTaskList(registry.allTasks)


import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css'; // Import the default CSS for styling
import { format } from "date-fns"
// Initialize Flatpickr
flatpickr('#do-date', {
  dateFormat: 'Y-m-d',
  altInput: true,   
  altFormat: "F j, Y", 
  onChange: function(selectedDates, dateStr, instance) {
    const selectedDate = new Date(dateStr)
    console.log(selectedDate.toISOString());
    console.log(format(selectedDate, 'MMMM d, yyyy'));
  },
});
flatpickr('#due-date', {
	dateFormat: 'Y-m-d',
	altInput: true,   
	altFormat: "F j, Y", 
	onChange: function(selectedDates, dateStr, instance) {
	  const selectedDate = new Date(dateStr)
	  console.log(selectedDate.toISOString());
	  console.log(format(selectedDate, 'MMMM d, yyyy'));
	},
  });
flatpickr('#start-date', {
	dateFormat: 'Y-m-d',
	altInput: true,   
	altFormat: "F j, Y", 
	onChange: function(selectedDates, dateStr, instance) {
	  const selectedDate = new Date(dateStr)
	  console.log(selectedDate.toISOString());
	  console.log(format(selectedDate, 'MMMM d, yyyy'));
	},
  });
flatpickr('#end-date', {
	dateFormat: 'Y-m-d',
	altInput: true,   
	altFormat: "F j, Y", 
	onChange: function(selectedDates, dateStr, instance) {
	  const selectedDate = new Date(dateStr)
	  console.log(selectedDate.toISOString());
	  console.log(format(selectedDate, 'MMMM d, yyyy'));
	},
  });
// const randomTask1 = registry.allTasks[0]
// const randomTask2 = registry.allTasks[1]
// const randomTask3 = registry.allTasks[2]
// const addedProj1 = addProject('Extra')

// const date = new Date()
// const date2 = formatISO(addDays(date,1))
// const addedTask1 = addTask(addedProj1,'X Task',date2,date2,date2)
// const addedTag1 = addTag('X Tag')
// tagOther(addedTask1,addedTag1)
// tagUrgency(addedTask1,'high')

// const changesArr1 = {
//     isDone: true,
//     doDate: formatISO(addDays(date,1))
//     ,dueDate: formatISO(addDays(date,1))
// }
// const changesArr2 = {
//     doDate: formatISO(addDays(date,2))
//     ,dueDate: formatISO(addDays(date,2))
// }
// const changesArr3 = {
//     doDate: formatISO(addDays(date,10))
//     ,dueDate: formatISO(addDays(date,10))
// }
// editTask(randomTask1.taskId, changesArr1)
// editTask(randomTask2.taskId, changesArr2)
// editTask(randomTask3.taskId, changesArr3)
// tagUrgency(randomTask1.taskId,'high')
// tagOther(randomTask2.taskId,addedTag1)
// const filterObj = {
//     isDone: 'none',
//     timeFilter:
//     {
//       period: 'tomorrow',
//       dateType: 'doDate'
//     },
//     urgencyFilter: 'none',
//     tagFilter: [],
//     projectFilter: 'none',
//   }

// setTimeout(() => {
//     const testFiltered = filter.filterAll(filterObj)
//     console.table(testFiltered)
// }, 1000)


import easyToggle from "easy-toggle-state";

const handler = () => {
	easyToggle();
	document.removeEventListener("DOMContentLoaded", handler);
};
document.addEventListener("DOMContentLoaded", handler);

