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


function sandboxTestConsole(){
    console.log('console is attached')
}
export default {editTask,sandboxTestConsole}