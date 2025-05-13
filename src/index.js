import "./styles/styles"
import {Project, Task, Tag} from './modules/coreFunction/classes'
import registry from './modules/coreFunction/registry'
import {generateDefaults} from './modules/coreFunction/defaultObjs'
import {addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "./modules/coreFunction/basicFunction"
import filter from './modules/coreFunction/filter'
import { subDays, addDays, formatISO, parseISO, isToday, isTomorrow, isThisWeek, isThisMonth, isPast } from 'date-fns';
import htmlGenerator from "./modules/htmlGenerator"
import externalLibraries from "./modules/externalLibraries"
generateDefaults()
htmlGenerator.generateTagSectionInTask(registry.allTags,'task-1')
htmlGenerator.generateTagSectionInFIlter(registry.allTags)
htmlGenerator.generateProjectList(registry.allProjects)
htmlGenerator.generateTaskList(registry.allTasks)

externalLibraries.InitializeFlatpickr()

// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.css'; // Import the default CSS for styling
// import { format } from "date-fns"
// // Initialize Flatpickr
// const doDate = flatpickr('#do-date', {
//   dateFormat: 'Y-m-d',
//   altInput: true,   
//   altFormat: "F j, Y", 
//   onChange: function(selectedDates, dateStr, instance) {
//     const selectedDate = new Date(dateStr)
//     console.log(selectedDate.toISOString());
//     console.log(format(selectedDate, 'MMMM d, yyyy'));
//   },
// });
// const dueDate = flatpickr('#due-date', {
// 	dateFormat: 'Y-m-d',
// 	altInput: true,   
// 	altFormat: "F j, Y", 
// 	onChange: function(selectedDates, dateStr, instance) {
// 	  const selectedDate = new Date(dateStr)
// 	  console.log(selectedDate.toISOString());
// 	  console.log(format(selectedDate, 'MMMM d, yyyy'));
// 	},
//   });
// const startDate = flatpickr('#start-date', {
// 	dateFormat: 'Y-m-d',
// 	altInput: true,   
// 	altFormat: "F j, Y", 
// 	onChange: function(selectedDates, dateStr, instance) {
// 	  const selectedDate = new Date(dateStr)
// 	  console.log(selectedDate.toISOString());
// 	  console.log(format(selectedDate, 'MMMM d, yyyy'));
// 	},
//   });
// const endDate = flatpickr('#end-date', {
// 	dateFormat: 'Y-m-d',
// 	altInput: true,   
// 	altFormat: "F j, Y", 
// 	onChange: function(selectedDates, dateStr, instance) {
// 	  const selectedDate = new Date(dateStr)
// 	  console.log(selectedDate.toISOString());
// 	  console.log(format(selectedDate, 'MMMM d, yyyy'));
// 	},
//   });



import easyToggle from "easy-toggle-state";
import uiInteractions from "./modules/uiInteractions"

const handler = () => {
	easyToggle();
	document.removeEventListener("DOMContentLoaded", handler);
	
};
document.addEventListener("DOMContentLoaded", handler);
document.addEventListener("DOMContentLoaded", uiInteractions.loadProjectDetailsHandler())

