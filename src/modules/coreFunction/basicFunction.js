import {Project, Task, Tag} from './classes'
import registry from './registry'
function addProject(name = "New Project", makeDate = undefined, startDate=undefined, endDate=undefined, description="Add project description") {
    const newProj = new Project(name, makeDate, startDate,endDate, description)
    registry.allProjects.push(newProj)
    return newProj.projectId
}

function editProject(projectId, name, makeDate, startDate, endDate, description) {
    const proj = registry.allProjects.find(p => p.projectId === projectId)
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
        console.table(registry.allProjects)
        return proj.projectId
    }
}

function addTask(projectId, name = "New Task", makeDate = undefined, startDate = undefined, endDate = undefined, description = "Add task description"){
    const newTask = new Task(false, projectId, name, makeDate, startDate,endDate, description)
    registry.allTasks.push(newTask)

    return newTask.taskId
}

function editTask(taskId, projectId, name,makeDate, doDate, dueDate, description){
    const task = registry.allTasks.find(t => t.taskId === taskId)
    if (task.taskId === undefined){
        console.log('Invalid task ID')
        return
    } else if (
        registry.allProjects.some(proj => proj.projectId === projectId) &&
        registry.allTasks.some(task => task.taskId === taskId)
    ){
        task.projectId = projectId;
        task.name = name;
        task.makeDate = makeDate;
        task.doDate = doDate;
        task.dueDate = dueDate;
        task.description = description;
        console.table(task)
        console.table(registry.allTasks)
    } else {
        console.log(registry.allProjects.includes(projectId))
        console.log('works but something is wrong')
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
        tagTask(taskId,tagId)
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
        tagTask(taskId,tagId)
    } else {
        console.log('not an other tag')
    }
}

export {addProject, editProject, addTask, editTask, addTag, editTag,tagUrgency,tagOther}