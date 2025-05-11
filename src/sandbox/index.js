import "./styles.css"
import registry from '../modules/coreFunction/registry'
import {generateDefaults} from '../modules/coreFunction/defaultObjs'
import {removeTag, addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "../modules/coreFunction/basicFunction"
import testScript from './test'
import { parseISO, isToday, isTomorrow, isThisWeek, isThisMonth, isPast } from 'date-fns';
// generateDefaults()


testScript.generateTagSectionInTask(registry.allTags,'task-1')



