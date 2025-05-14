//unused for now, might need later.
function getNewItems(oldArr,newArr,id){
    return newArr.filter(
      newItem => !oldArr.some(oldItem => oldItem[id] === newItem[id]))
  }