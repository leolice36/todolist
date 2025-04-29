import {Project, Task, Tag} from './classes'
import truth from './truth'
function addProject(name = "New Project", makeDate = undefined, startDate=undefined, endDate=undefined, description="Add project description") {
    const newProj = new Project(name, makeDate, startDate,endDate, description)
    truth.allProjects.push(newProj)
    return newProj.projectId
}

function editProject(projectId, name, makeDate, startDate, endDate, description) {
    const proj = truth.allProjects.find(p => p.projectId === projectId)
    if (proj.projectId === 'undefined'){
        console.log('Invalid project ID')
        return
    } else {
        proj.name = name;
        proj.makeDate = makeDate;
        proj.startDate = startDate;
        proj.endDate = endDate;
        proj.description = description;
        console.table(proj)
        console.table(truth.allProjects)
        return proj.projectId
    }
}

function addTask(projectId, name = "New Task", makeDate = undefined, startDate = undefined, endDate = undefined, description = "Add task description"){
    const newTask = new Task(false, projectId, name, makeDate, startDate,endDate, description)
    truth.allTasks.push(newTask)

    return newTask.taskId
}

function editTask(taskId, projectId, name,makeDate, doDate, dueDate, description){
    const task = truth.allTasks.find(t => t.taskId === taskId)
    if (task.taskId === undefined){
        console.log('Invalid task ID')
        return
    } else if (
        truth.allProjects.some(proj => proj.projectId === projectId) &&
        truth.allTasks.some(task => task.taskId === taskId)
    ){
        task.projectId = projectId;
        task.name = name;
        task.makeDate = makeDate;
        task.doDate = doDate;
        task.dueDate = dueDate;
        task.description = description;
        console.table(task)
        console.table(truth.allTasks)
    } else {
        console.log(truth.allProjects.includes(projectId))
        console.log('works but something is wrong')
    }
    
    return task.taskId
}

function addTag(name){
    const newTag = new Tag(name)
    truth.allTags.push(newTag)
    console.table(newTag)
    console.table(truth.allTags)
    return newTag.tagId
}

function editTag(tagId, name){
    const tag = truth.allTags.find(t => t.tagId === tagId)
    console.table(tag)
    console.log('Works up to here')
    if (tag.tagId === undefined){
        console.log('Invalid tag ID')
        return
    } else if (truth.allTags.some(tag => tag.tagId === tagId)){
        tag.name = name
        console.table(tag)
    } else {
        console.log('works but something is wrong')
    }
}

function tagTask(taskId,tagId){
    const task = truth.allTasks.find(t => t.taskId === taskId)
    const tag = truth.allTags.find(t => t.tagId === tagId)
    if (task.taskId === undefined){
        console.log('Invalid task ID')
        return
    } else if (tag.tagId === undefined){
        console.log('Invalid tag ID')
        return
    } else if (
        truth.allTasks.some(task => task.taskId === taskId) &&
        truth.allTags.some(tag => tag.tagId === tagId)
        )
    {
        task.tags.push(tag.tagId)
        console.log(task.tags)
        console.table(task)
        return [task.taskId, tag.tagId]
    } else{
        console.log('works but something is wrong')
    }
}


export {addProject, editProject, addTask, editTask, addTag, editTag,tagTask}