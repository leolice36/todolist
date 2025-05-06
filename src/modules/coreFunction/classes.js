class Project {
    constructor(name, makeDate, startDate, endDate, description){
        this.name = name;
        this.makeDate = makeDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        // this.taskIdArr = [] //Ids of task in this project
        // this.tags = [] //Ids of project tags in this project NOT SURE IF NEEDED
        this.projectId = crypto.randomUUID();
        this.color = '';
    }
}

class Task {
    constructor(isDone, projectId, name,makeDate, doDate, dueDate, description){
        this.isDone = isDone
        this.projectId = projectId //Id of associated project
        this.name = name;
        this.makeDate = makeDate;
        this.doDate = doDate;
        this.dueDate = dueDate;
        this.description = description;
        this.tags = [] //Ids of tasks tags in this project
        this.taskId = crypto.randomUUID();
        this.color = '';
    }
}

//NOTE: I think I'll tag each task automatically based on a tag in a project,
// so the tags are all the same in terms of project or task, its just the way applied

class Tag {
    constructor(name = 'New Tag', type = 'other'){
        this.name = name;
        this.type = type; //urgency or other
        this.tagId = crypto.randomUUID();
        this.color = '';
    }
}

export {Project, Task, Tag}