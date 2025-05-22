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
    // timeFilter:'none',
    // urgencyFilter: 'none',
    // tagFilter: {},
    // projectFilter: 'none',
}

function loadFilterHandlers(){
    const filterBtn = document.querySelector('.filter-btn')
    filterBtn.addEventListener('click', filterBtnSequence)

    const isDoneToggle = document.querySelector('#show-comp-toggle')
    isDoneToggle.addEventListener('click', isDoneToggleSequence)
}

function filterBtnSequence(){
    console.log('apply filters')

}

function isDoneToggleSequence(){
    
    const isDoneToggle = document.querySelector('#show-comp-toggle')
    const isPressed = isDoneToggle.classList.contains('is-pressed')

    if (isPressed){
        localFilterObj.isDone = false
    } else {
        localFilterObj.isDone = 'none'
    }
    Object.assign(filter.filterObj,localFilterObj)
    // console.table(filter.filterObj)
    // console.table(localFilterObj)
    taskSection.printFilteredTasks()
}

function getFilterValues(){

}
export default {loadFilterHandlers}