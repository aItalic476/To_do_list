
var taskElements= {
card:{
    tag: "div",
    class: "card shadow-sm mb-3 task"
},
envelope:{
    tag: "div",
    class: "envelope"
},
cardBody:{
    tag: "div",
    class:"card-body"
},

buttonDelete:{
    tag: "button",
    class: "btn btn-outline-light border-0"
},

cardTitle:{
    tag: "h5",
    class: "card-title text-light"
},

cardText:{
    tag: "h6",
    class: "card-text text-light"
}},
toDocolumn = document.querySelector('#toDocolumn'),
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


function fetchAllTasksData(){
    
    fetch("modules/php/getAllTasks.php",{
        method: "GET"
    })
    .then(function(response){
        return response.json()
    })
    .then(function(values){
        toDocolumn.replaceChildren()
        toDocolumn.insertAdjacentHTML('beforeend',`<button class="text-light"
        style=" max-height:4vh; background-color:transparent; outline:none; border: none; box-shadow: none;"
        data-bs-toggle="modal"
        data-bs-target="#taskModal"
        data-button-add="newTask"
         >
       <div style="display: flex; align-items: center;justify-content: center;">
           <div style="font-size: 5vh; font-weight: 300;">+&nbsp;</div>
           <div style="font-weight: 300;">Add new task</div></div>
       </button>`)
        presentColumn.replaceChildren()
        completedColumn.replaceChildren()

        for (let item in values){
            renderTask(values[item])
        }
    })
    .catch(function(error){
        console.log(error)
    })
}

//блок switch-case в функциях renderTask и createItems вынести в отдельные функции
// цикл в ajax запросе вынести в функцию render
function renderTask(item){
    let [card, envelope, cardBody,buttonDelete,cardTitle,cardText] = createItems();

    card.id = item.id;
    card.setAttribute("data-task-category",item.category)

    cardTitle.innerText = item.title;
    cardText.innerText = item.description;
    
    envelope.append(buttonDelete);
    cardBody.append(cardTitle,cardText);
    card.append(envelope,cardBody);
    
    card.addEventListener('dragstart',function(e){
        e.dataTransfer.setData('text/plain',[e.target.id,e.target.getAttribute("data-task-category")]);
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0); 
    })
     card.addEventListener('dragover',function(e){
        if(e.target.hasAttribute("data-task")){
            
    } 
    })
    card.addEventListener('dragend',function(event){
        event.target.classList.remove('hide')
        
    })

    switch(item.category){
        case "toDo":
            toDocolumn.insertAdjacentElement('beforeend',card);
        break;

        case "present":
            presentColumn.insertAdjacentElement('beforeend',card);
        break;

        case "completed":
            completedColumn.insertAdjacentElement('beforeend',card);
        break;
        default: toDocolumn.insertAdjacentElement('beforeend',card);
    }
    
}

function createItems(){
    let newItems =[];
    for (let item in taskElements){
        let newItem = document.createElement(taskElements[item].tag);
        newItem.className = taskElements[item].class;
        switch (item){
            case "card":
                newItem.setAttribute("data-bs-toggle","modal");
                newItem.setAttribute("data-bs-target","#taskModal");
                newItem.setAttribute("data-task","task");
                newItem.setAttribute("draggable","true")
            break;
            case "buttonDelete":
                newItem.setAttribute("data-bs-toggle","modal");
                newItem.setAttribute("data-bs-target","#deleteModal");
                newItem.insertAdjacentHTML('beforeend',`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                </svg>`)
            break;        
        }       
        
        newItems.push(newItem);
    }
    return newItems
}

export {fetchAllTasksData}