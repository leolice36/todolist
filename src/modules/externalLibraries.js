import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css'; // Import the default CSS for styling
import { format } from "date-fns"
import easyToggle from "easy-toggle-state";
import uiInteractions from './uiInteractions/uiInteractions';
import Choices from 'choices.js';
import randomUtilities from './randomUtilities';


const flatpickrInstances = {
    doDate: null,
    dueDate: null,
    startDate: null,
    endDate: null,
  }
function initializeFlatpickr(){
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

const choiceJSInstances = {
  urgencyFilter: null,
  urgencyTagger: null,
  otherFilter: null,
  otherTagger: null,
}

function initializeChoicesJs(){
  const urgencyTags = randomUtilities.getUrgencyTags()
  choiceJSInstances.urgencyTagger = new Choices('#urgency-select', {
    searchEnabled: false,
    itemSelectText: '',
    placeholder: true,
    placeholderValue: 'Tag Urgency',
    shouldSort:false,
    choices: urgencyTags.map(tag => ({
      value: tag.tagId,
      label: tag.name
    }))
  })
  choiceJSInstances.urgencyFilter = new Choices('#urgency-select-filter', {
    searchEnabled: false,
    itemSelectText: '',
    placeholder: true,
    placeholderValue: '',
    shouldSort:false,
    choices: urgencyTags.map(tag => ({
      value: tag.tagId,
      label: tag.name
    }))
  })
  // const deselectOption = document.createElement('option');
  // deselectOption.value = 'none'
  // deselectOption.textContent = 'None'


  const otherTags = randomUtilities.getOtherTags()
  choiceJSInstances.otherTagger = new Choices('#tag-select-task', {
    removeItemButton: true,
    shouldSort: false,
    searchEnabled: true,
    choices: otherTags.map(tag => ({
      value: tag.tagId,
      label: tag.name
    }))
  });

  //Attach to filter object via event listeners 
  choiceJSInstances.otherFilter = new Choices('#tag-select-filter', {
    removeItemButton: true,
    shouldSort: false,
    searchEnabled: true,
  });

}

function initializeEasyToggle() {
	easyToggle();
};
export default {flatpickrInstances,initializeFlatpickr,initializeEasyToggle,choiceJSInstances,initializeChoicesJs}