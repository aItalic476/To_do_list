import * as DataModule from './modules/js/data-module.js'
import * as TaskModule from './modules/js/task-module.js'
import * as ModalModule from './modules/js/modals-module.js'

var allColumns = document.querySelectorAll("[data-column]"),
    editModal = document.querySelector("#taskModal"),
    deleteModal = document.querySelector('#deleteModal'),
    deleteBtn = deleteModal.querySelector('[data-delete]'),
    form = editModal.querySelector('form'),
    taskId,
    deleteId;

DataModule.fullDataProvider.context = TaskModule.renderTasks
DataModule.singleDataProvider.context= ModalModule.setModalContent

allColumns.forEach(column=>{
    column.addEventListener('dragenter',function(e){
        e.preventDefault()
    })
    column.addEventListener('dragover',function(e){
        e.preventDefault()
    })
    column.addEventListener('dragleave',function(e){
        e.preventDefault()
    })
    column.addEventListener('drop',function(e){
        if(e.target.hasAttribute("data-column-category")){
            let id = e.dataTransfer.getData('text/plain').split(',')[0],
                columnCategory = e.target.getAttribute("data-column-category"),
                task=document.getElementById(id)
            e.target.append(task)
            task.classList.remove('hide')
            DataModule.updateCategoryProvider.body=JSON.stringify({id:id,category:columnCategory})
            DataModule.updateCategoryProvider.context=((task,columnCategory)=>()=>task.setAttribute("data-task-category",columnCategory))
            DataModule.updateCategoryProvider.provide()
        }
    })

})

document.addEventListener("DOMContentLoaded",function(){
    DataModule.fullDataProvider.provide()
}) 


editModal.addEventListener('show.bs.modal',function(event){
     taskId = event.relatedTarget.id
     ModalModule.clearModalContent()
    if(!!taskId){
        DataModule.singleDataProvider.body = JSON.stringify({id:taskId})
        DataModule.singleDataProvider.provide()
    }
})

form.addEventListener('submit',function(event){
    event.preventDefault()
    if(!!taskId){
        DataModule.updateDataProvider.body = ModalModule.getModalContent(taskId)
        DataModule.updateDataProvider.provide()
    } else{
       DataModule.addDataProvider.body= ModalModule.getModalContent()
       DataModule.addDataProvider.provide()
    }

})

editModal.addEventListener('hidden.bs.modal',function(){
    ModalModule.clearModalContent()
    DataModule.fullDataProvider.provide()
})

deleteModal.addEventListener('show.bs.modal',function(event){
    deleteId=event.relatedTarget.closest("[data-task]").id
}) 

 deleteBtn.addEventListener('click',function(){
    DataModule.deleteDataProvider.body=JSON.stringify({id:deleteId})
    DataModule.deleteDataProvider.provide()
}) 

deleteModal.addEventListener('hidden.bs.modal',function(){
    DataModule.fullDataProvider.provide()
}) 