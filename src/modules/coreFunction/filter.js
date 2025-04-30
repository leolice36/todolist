import registry from './registry'
function byTag(tagId, taskArray = registry.allTasks) {
    // console.log('works up to here')
    console.table(taskArray)
    const filteredArr = taskArray.filter(task => task.tags.includes(tagId));
    return filteredArr
  }

export default {byTag}