import {renderAllTasks} from './modules/js/task-module.js';
import {getTaskById, editModal,deleteModal,form,deleteBtn,updateTask,addTask, deleteTask, clearForm} from './modules/js/modals-module.js'

 document.addEventListener("DOMContentLoaded",function(){
    renderAllTasks();
}) 

var taskId,deleteId;

editModal.addEventListener('show.bs.modal',function(event){
     taskId = event.relatedTarget.id
     clearForm()
    if(!!taskId){
        getTaskById(taskId)
    }
})

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
    renderAllTasks()
})

deleteModal.addEventListener('show.bs.modal',function(event){
    deleteId=event.relatedTarget.closest("[data-task]").id
}) 

 deleteBtn.addEventListener('click',function(){
    deleteTask(deleteId)
}) 

deleteModal.addEventListener('hidden.bs.modal',function(){
    renderAllTasks()
}) 