
var toDocolumn = document.querySelector('#toDocolumn'),
presentColumn=document.querySelector('#presentColumn'),
completedColumn=document.querySelector('#completedColumn'),
allColumns = [toDocolumn,presentColumn,completedColumn];
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
        task.classList.remove('hide');
        updateCategory(task,id,columnCategory)
        }
    })

})


function updateCategory(task,id, columnCategory){
    let url = "/modules/php/updateCategory.php"
    fetch(url,{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id:id,category:columnCategory})
    })
    .then(function(){
        task.setAttribute("data-task-category",columnCategory)
    })
}


export function renderAllTasks(){
    fetch("modules/php/getAllTasks.php",{
        method: "GET"
    })
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        clearColumns()
        data.forEach(item=>createTask(item))
        
    })
    .catch(function(error){
        console.log(error)
    })
}

function clearColumns(){
    toDocolumn.replaceChildren()
    presentColumn.replaceChildren()
    completedColumn.replaceChildren()
}

function createTask(item){
    let task = getTask()
    setTaskData(task,item)
    setTaskListeners(task)
    categorizeTask(item,task)
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

function categorizeTask(item,task){
    switch(item.category){
        case "toDo":
            toDocolumn.insertAdjacentElement('beforeend',task);
        break;

        case "present":
            presentColumn.insertAdjacentElement('beforeend',task);
        break;

        case "completed":
            completedColumn.insertAdjacentElement('beforeend',task);
        break;
        default: toDocolumn.insertAdjacentElement('beforeend',task);
    }
}