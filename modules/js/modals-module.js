export function setModalContent(data){
    document.querySelector('#taskTitle').innerText= data.title;
    document.querySelector('#taskName').value = data.title;
    document.querySelector('#taskDetails').value = data.description;
}

export function getModalContent(taskId=null){
    return JSON.stringify({
        id:taskId,
        title:document.querySelector('#taskName').value,
        details:document.querySelector('#taskDetails').value
    })
}

export function clearModalContent(){
    document.querySelector('#taskTitle').innerText = "New Task"
    document.querySelector('#taskName').value = ""
    document.querySelector('#taskDetails').value = ""
}