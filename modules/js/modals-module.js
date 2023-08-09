var editModal = document.querySelector("#taskModal"),
deleteModal = document.querySelector('#deleteModal'),
deleteBtn = deleteModal.querySelector("[data-delete]"),
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

function deleteTask(deleteId){
    let url = "/modules/php/deleteTask.php",
    data = {id:deleteId}
    fetch(url,{
        method:"POST",
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

export {getTaskById, editModal,deleteModal,form,deleteBtn,updateTask,addTask, deleteTask, clearForm}

