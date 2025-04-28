import "./styles.css"
import {Project, Task, Tag} from './modules/coreFunction/classes'
import truth from './modules/coreFunction/truth'
import {generateDefaults} from './modules/coreFunction/defaultObjs'
import { addProject} from "./modules/coreFunction/basicFunction"

generateDefaults()

addProject()
console.table(truth.allProjects)