import "./styles.css"
import registry from '../modules/coreFunction/registry'
import {generateDefaults} from '../modules/coreFunction/defaultObjs'
import {addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../modules/coreFunction/basicFunction"
import testScript from './test'
import { parseISO, isToday, isTomorrow, isThisWeek, isThisMonth, isPast } from 'date-fns';
// generateDefaults()
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";


const choices = new Choices('#tag-select', {
    removeItemButton: true,
    shouldSort: false,
  });
