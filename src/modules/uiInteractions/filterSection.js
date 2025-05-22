import registry from "../coreFunction/registry";
import {deleteTask, deleteProject, removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../coreFunction/basicFunction"
import htmlGenerator from "../htmlGenerator";
import filter from "../coreFunction/filter";
import randomUtilities from "../randomUtilities";
import externalLibraries from "../externalLibraries";
import Choices from "choices.js";
import flatpickr from "flatpickr";
import projectSection from "./projectSection";

function loadFilterHandlers(){
    const filterBtn = document.querySelector('.filter-btn')
    filterBtn.addEventListener('click', filterBtnSequence)
}

function filterBtnSequence(){
    console.log('apply filters')
}

export default {loadFilterHandlers}