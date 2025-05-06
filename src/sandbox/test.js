import registry from '../modules/coreFunction/registry'


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


function sandboxTestConsole(){
    console.log('console is attached')
}
export default {editTask,sandboxTestConsole}