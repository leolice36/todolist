import {Project, Task, Tag} from './classes'
import registry from './registry'
function addProject(name = "New Project", makeDate = undefined, startDate=undefined, endDate=undefined, description="Add project description") {
    const newProj = new Project(name, makeDate, startDate,endDate, description)
    registry.allProjects.push(newProj)
    return newProj.projectId
}

function editProject(projectId, changesArr) {
    const proj = registry.allProjects.find(p => p.projectId === projectId)
    if (proj.projectId === 'undefined'){
        console.log('Invalid project ID')
        return
    } else {
        Object.assign(proj, changesArr)
        console.table(proj)
        console.table(registry.allTasks)
        return proj.projectId
    }
}

function addTask(projectId, name = "New Task", makeDate = undefined, startDate = undefined, endDate = undefined, description = "Add task description"){
    const newTask = new Task(false, projectId, name, makeDate, startDate,endDate, description)
    registry.allTasks.push(newTask)

    return newTask.taskId
}

function editTask(taskId, changesArr){
    const task = registry.allTasks.find(t => t.taskId === taskId)
    if (task.taskId === undefined){
        console.log('Invalid task ID')
        return
    } else if (
        registry.allProjects.some(proj => proj.projectId === task.projectId) &&
        registry.allTasks.some(task => task.taskId === taskId)
    ){
        Object.assign(task, changesArr)
        console.table(task)
    } else {
        console.log(registry.allProjects.includes(task.projectId))
        console.log('works but something is wrong')
        console.log(changesArr.projectId)
    }
    
    return task.taskId
}

function addTag(name){
    const newTag = new Tag(name)
    registry.allTags.push(newTag)
    console.table(newTag)
    console.table(registry.allTags)
    return newTag.tagId
}

function editTag(tagId, name){
    const tag = registry.allTags.find(t => t.tagId === tagId)
    console.table(tag)
    console.log('Works up to here')
    if (tag.tagId === undefined){
        console.log('Invalid tag ID')
        return
    } else if (registry.allTags.some(tag => tag.tagId === tagId)){
        tag.name = name
        console.table(tag)
    } else {
        console.log('works but something is wrong')
    }
}
//Internal
function tagTask(taskId,tagId){
    const task = registry.allTasks.find(t => t.taskId === taskId)
    const tag = registry.allTags.find(t => t.tagId === tagId)
    if (task.taskId === undefined){
        console.log('Invalid task ID')
        return
    } else if (tag.tagId === undefined){
        console.log('Invalid tag ID')
        return
    } else if (
        registry.allTasks.some(task => task.taskId === taskId) &&
        registry.allTags.some(tag => tag.tagId === tagId)
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

function tagUrgency(taskId,tagId){
    const tag = registry.allTags.find(t => t.tagId === tagId)
    if (tag.type === 'urgency'){
        return tagTask(taskId,tagId)
    } else {
        console.log('not an urgency tag')
    }
}

function tagOther(taskId,tagId){
    const task = registry.allTasks.find(t => t.taskId === taskId)
    const tag = registry.allTags.find(t => t.tagId === tagId)
    if (tag.type === 'other'&&
        !task.tags.some(existingTag => existingTag.tagId === tagId)
    ){
        return tagTask(taskId,tagId)
    } else {
        console.table(tag)
        console.log('not an other tag')
    }
}

export {addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther}