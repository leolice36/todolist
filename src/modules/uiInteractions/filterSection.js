import registry from "../coreFunction/registry";
import {deleteTask, deleteProject, removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../coreFunction/basicFunction"
import htmlGenerator from "../htmlGenerator";
import filter from "../coreFunction/filter";
import randomUtilities from "../randomUtilities";
import externalLibraries from "../externalLibraries";
import Choices from "choices.js";
import flatpickr from "flatpickr";
import projectSection from "./projectSection";
import taskSection from "./taskSection";

const localFilterObj = {
    // isDone: 'none',
    // timeFilter: 'none',
    // urgencyFilter: 'none',
    tagFilter: [],
    // projectFilter: 'none',
}

const dateFilterObj = {dateType:'doDate'};

function loadFilterHandlers(){
    const filterBtn = document.querySelector('.filter-btn')
    filterBtn.addEventListener('click', filterBtnSequence)

    const isDoneToggle = document.querySelector('#show-comp-toggle')
    isDoneToggle.addEventListener('click', isDoneToggleSequence)

    const doDueToggle = document.querySelector('#do-due-toggle')
    doDueToggle.addEventListener('click', doDueToggleSequence)

    const dropdownContainer = document.querySelector('.example-dropdown');
    dropdownContainer.addEventListener('click', handleDropdown);

    const tagSelect = document.querySelector('#tag-select-filter');
    setupAddRemoveEventListenersForFilter(tagSelect)
}

function filterBtnSequence(){
    console.log('apply filters')

}

function isDoneToggleSequence(){
    
    const isDoneToggle = document.querySelector('#show-comp-toggle')
    const isPressed = isDoneToggle.classList.contains('is-pressed')

    if (isPressed){
        localFilterObj.isDone = 'none'
    } else {
        localFilterObj.isDone = false
    }
    Object.assign(filter.filterObj,localFilterObj)
    taskSection.printFilteredTasks()
}

function handleDropdown(e){
    const dropdownContainer = document.querySelector('.example-dropdown');
    if (e.target.matches('[data-toggle-trigger-off]')) {
        const selectedText = e.target.textContent.trim();
        const toggleButton = dropdownContainer.querySelector('.example-dropdown-button');
        toggleButton.textContent = selectedText;
        const filterValue = randomUtilities.toCamelCase(selectedText)
        console.log(filterValue)

        if (filterValue != 'none'){
            dateFilterObj.period = filterValue;
            if(!('dateType' in dateFilterObj)){
                doDueToggleSequence()
            }
            localFilterObj.timeFilter = dateFilterObj
        }else if(filterValue == 'none'){
            randomUtilities.emptyObject(dateFilterObj)
            localFilterObj.timeFilter = 'none'
        }
        
        Object.assign(filter.filterObj,localFilterObj)
        taskSection.printFilteredTasks()   


        console.table(dateFilterObj)
        console.table(localFilterObj)
    }
}

function doDueToggleSequence(){
    const doDueToggle = document.querySelector('#do-due-toggle')
    const isPressed = doDueToggle.classList.contains('is-pressed')

    if (isPressed){
        dateFilterObj.dateType = 'dueDate'
    } else {
        dateFilterObj.dateType = 'doDate'
    }

    if('period' in dateFilterObj){
        localFilterObj.timeFilter = dateFilterObj
        Object.assign(filter.filterObj,localFilterObj)
        taskSection.printFilteredTasks()
    }
    console.table(dateFilterObj)
    console.table(localFilterObj)
}

function setupAddRemoveEventListenersForFilter(tagSelect){
    tagSelect.addEventListener('addItem', function(event){
      const tagId = event.detail.value
      const tag = registry.allTags.find(t => t.tagId === tagId)
      localFilterObj.tagFilter.push(tagId)
      Object.assign(filter.filterObj,localFilterObj)
      taskSection.printFilteredTasks()
      console.log('filtering for', event.detail.label)
    })
    tagSelect.addEventListener('removeItem', function(event){
      const tagId = event.detail.value
      const indexOfRemovedId = localFilterObj.tagFilter.indexOf(tagId)
      localFilterObj.tagFilter.splice(indexOfRemovedId,1)
      Object.assign(filter.filterObj,localFilterObj)
      taskSection.printFilteredTasks()
      console.log('filter for', event.detail.label, 'was removed')})
  }
export default {loadFilterHandlers}