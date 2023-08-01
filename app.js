import {fetchAllTasksData} from './modules/js/task-module.js';
import {getTaskById, editModal,form,updateTask,addTask, clearForm} from './modules/js/modals-module.js'
import './modules/js/dragndrop-module.js'

document.addEventListener("DOMContentLoaded",function(){
    fetchAllTasksData();

})
var taskId;
//(!!taskId)?getTaskById(taskId):clearForm()
editModal.addEventListener('show.bs.modal',function(event){
     taskId = event.relatedTarget.id
     clearForm()
    if(!!taskId){
        getTaskById(taskId)
    }
})
//(!!taskId)?updateTask(taskId):addTask()
form.addEventListener('submit',function(event){
    event.preventDefault()
    if(!!taskId){
        updateTask(taskId)
    } else{
        addTask()
    }

})

editModal.addEventListener('hidden.bs.modal',function(){
    clearForm()
    fetchAllTasksData()
})

 
