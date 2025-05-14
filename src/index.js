import "./styles/styles"
import {Project, Task, Tag} from './modules/coreFunction/classes'
import registry from './modules/coreFunction/registry'
import {generateDefaults} from './modules/coreFunction/defaultObjs'
import {addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther} from "./modules/coreFunction/basicFunction"
import filter from './modules/coreFunction/filter'
import { subDays, addDays, formatISO, parseISO, isToday, isTomorrow, isThisWeek, isThisMonth, isPast } from 'date-fns';
import htmlGenerator from "./modules/htmlGenerator"
import externalLibraries from "./modules/externalLibraries"
import uiInteractions from "./modules/uiInteractions/uiInteractions"
import projectSection from "./modules/uiInteractions/projectSection"
// generateDefaults()
// htmlGenerator.generateTagSectionInTask(registry.allTags,'task-1')
// htmlGenerator.generateTagSectionInFIlter(registry.allTags)
// htmlGenerator.generateProjectList(registry.allProjects)
// htmlGenerator.generateTaskList(registry.allTasks)

// externalLibraries.initializeFlatpickr()
// externalLibraries.initializeEasyToggle()



document.addEventListener("DOMContentLoaded", htmlGenerator.startUp)

