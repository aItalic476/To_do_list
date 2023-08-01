//import { fetchAllTasksData } from "./task-module.js";

var editModal = document.querySelector("#taskModal"),
deleteModal = document.querySelector('#deleteModal'),
taskTitle=editModal.querySelector('#taskTitle'),
taskName=editModal.querySelector('#taskName'),
taskDetails=editModal.querySelector('#taskDetails'),
form = editModal.querySelector('form')



    
function getTaskById(taskId){
    let targetId = taskId
    fetch("/modules/php/getTaskById.php",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({"id":targetId})
    })
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        setModalContent(data)        
    })
    .catch(function(error){
        console.log(error)
    })
}
//в eventListener нужно добавить функцию, проверяющую event.relatedTarget - то, откуда было вызвано модальное окно
//если модальное окно было вызвано из кнопки +Add new task, то очистить форму, а затем вставить написанное
//formData - это нечто странное, думаю легче обработать каждое поле формы и закодировать в json
function setModalContent(data){
    taskTitle.innerText= data.title;
    taskName.value = data.title;
    taskDetails.value = data.description;
}


function updateTask(taskId){
   
  let url = "/modules/php/updateTask.php",
    targetId = taskId,
    data = {id:targetId,title:taskName.value,details:taskDetails.value}
    form.action=url;
    fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify(data)
    })
    .then(function(response){
        console.log( response.status)
    })
    .catch(function(error){
        console.log(error)
    })
    
}

function addTask(){
    let url = "/modules/php/addTask.php",
    data = {title:taskName.value,details:taskDetails.value}
    form.action=url;
    fetch(url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify(data)
    })
    .then(function(response){
        console.log(response.status)
    })
    .catch(function(error){
        console.log(error)
    }) 
    
}

function clearForm(){
    taskTitle.innerText = "New Task"
    taskName.value = ""
    taskDetails.value = ""
}

export {getTaskById, editModal,form,updateTask,addTask, clearForm}

