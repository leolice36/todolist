import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css'; // Import the default CSS for styling
import { format } from "date-fns"
// Initialize Flatpickr

const flatpickrInstances = {
    doDate: null,
    dueDate: null,
    startDate: null,
    endDate: null,
  }
  function InitializeFlatpickr(){
    flatpickrInstances.doDate = flatpickr('#do-date', {
      dateFormat: 'Y-m-d',
      altInput: true,   
      altFormat: "F j, Y", 
      onChange: function(selectedDates, dateStr, instance) {
        const selectedDate = new Date(dateStr)
      },
    });
    flatpickrInstances.dueDate = flatpickr('#due-date', {
      dateFormat: 'Y-m-d',
      altInput: true,   
      altFormat: "F j, Y", 
      onChange: function(selectedDates, dateStr, instance) {
        const selectedDate = new Date(dateStr)
      },
      });
    flatpickrInstances.startDate  = flatpickr('#start-date', {
      dateFormat: 'Y-m-d',
      altInput: true,   
      altFormat: "F j, Y", 
      onChange: function(selectedDates, dateStr, instance) {
        const selectedDate = new Date(dateStr)
      },
      });
    flatpickrInstances.endDate = flatpickr('#end-date', {
      dateFormat: 'Y-m-d',
      altInput: true,   
      altFormat: "F j, Y", 
      onChange: function(selectedDates, dateStr, instance) {
        const selectedDate = new Date(dateStr)
      },
      });
  }
  
export default {flatpickrInstances,InitializeFlatpickr}