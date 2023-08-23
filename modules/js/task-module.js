var poolOfTasks = []

export function renderTasks(data){
    clearColumns()
    data.forEach((item)=>createTask(item))
}


function clearColumns(){
    poolOfTasks.forEach((task)=>{
        task.remove()
    })
   
}

function createTask(item){
    let task = getTask()
    setTaskData(task,item)
    setTaskListeners(task)
    categorizeTask(task)
    poolOfTasks.push(task)
}

function getTask(){
    let task = document.querySelector("#taskTemplate").content.firstElementChild.cloneNode(true);
    return task
}

function setTaskData(task,item){
    task.id = item.id
    task.setAttribute("data-task-category",item.category)
    task.querySelector('h5').innerText = item.title
    task.querySelector('h6').innerText = item.description
}

function setTaskListeners(task){

    task.addEventListener('dragstart',function(e){
        e.dataTransfer.setData('text/plain',[e.target.id,e.target.getAttribute("data-task-category")]);
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0); 
    })

    task.addEventListener('dragend',function(event){
        event.target.classList.remove('hide')
        
    })
}

function categorizeTask(task){
    let category = task.getAttribute('data-task-category')
    if(!category){
        document.querySelector('[data-column-category="toDo"]').insertAdjacentElement('beforeend',task)
    }
    else{
        document.querySelector(`[data-column-category=${category}]`).insertAdjacentElement('beforeend',task)
    }
}