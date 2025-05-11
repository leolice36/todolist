import "./styles.css"
import registry from '../modules/coreFunction/registry'
import {generateDefaults} from '../modules/coreFunction/defaultObjs'
import {removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../modules/coreFunction/basicFunction"
import testScript from './test'
import { parseISO, isToday, isTomorrow, isThisWeek, isThisMonth, isPast } from 'date-fns';
// generateDefaults()
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css'; // Import the default CSS for styling
import { format } from "date-fns"
// Initialize Flatpickr
flatpickr('#datepicker', {
  dateFormat: 'Y-m-d', // Set the output format to ISO
  onChange: function(selectedDates, dateStr, instance) {
    const selectedDate = new Date(dateStr)
    console.log(selectedDate.toISOString());
    console.log(format(selectedDate, 'MMMM d, yyyy'));
  },
});
flatpickr('#datepickerrange', {
    mode: 'range',
    dateFormat: 'Y-m-d',
    onChange: function(selectedDates) {
      const [start, end] = selectedDates;
  
      if (start) {
        console.log('Start:', format(start, 'MMMM d, yyyy'));
        console.log('Start:', start.toISOString());
      }
  
      if (end) {
        console.log('Start:', format(end, 'MMMM d, yyyy'));
        console.log('End:', end.toISOString());
      }
    },
  });
  





