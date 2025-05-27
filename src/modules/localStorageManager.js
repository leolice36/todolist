import registry from "./coreFunction/registry";
import htmlGenerator from "./htmlGenerator";
import { generateDefaults } from "./coreFunction/defaultObjs";

function initializeApp() {
    const hasInitialized = localStorage.getItem('hasInitialized');
  
    if (hasInitialized) {
        loadData();
        console.log('hasInitialized',hasInitialized)
    } else {
        generateDefaults()
        saveData(); // Save the generated defaults
        localStorage.setItem('hasInitialized', 'true'); // Mark as initialized
        console.log('hasInitialized',hasInitialized)
    }
  
    htmlGenerator.startUp()
  }
  
  
function saveData() {
    localStorage.setItem('allTasks', JSON.stringify(registry.allTasks));
    localStorage.setItem('allProjects', JSON.stringify(registry.allProjects));
    localStorage.setItem('allTags', JSON.stringify(registry.allTags));
}

function loadData() {
    const storedTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
    const storedProjects = JSON.parse(localStorage.getItem('allProjects')) || [];
    const storedTags = JSON.parse(localStorage.getItem('allTags')) || [];
  
    registry.allTasks.length = 0;
    registry.allTasks.push(...storedTasks);
  
    registry.allProjects.length = 0;
    registry.allProjects.push(...storedProjects);
  
    registry.allTags.length = 0;
    registry.allTags.push(...storedTags);
    replaceArrayContents(registry.allTasks, storedTasks);
    replaceArrayContents(registry.allProjects, storedProjects);
    replaceArrayContents(registry.allTags, storedTags);
  }

function replaceArrayContents(target, newContents) {
target.length = 0;
target.push(...newContents);
}

export default {initializeApp,loadData,saveData}