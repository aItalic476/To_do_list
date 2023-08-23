async function dataAccessor(){
    try {
        let response = await fetch(this.url,{
            method: this.method,
            body: this.body,
            headers: this.headers
        }),
        data = await response.json()
        .then(this.context)
        
    }
    catch(err){
        console.log(err)
    }
}

function getStatus(data){
    return data
}

function dataProvider(url,method,body=null,headers,context=getStatus){
    return {
        url:url,
        method:method,
        body:body,
        headers:headers,
        context: context,
        provide:dataAccessor
    }
}

export var fullDataProvider = dataProvider("modules/php/getAllTasks.php","GET",null,{"Content-Type": "application/json"}),
singleDataProvider = dataProvider("/modules/php/getTaskById.php","POST",{"Content-Type": "application/json"}),
updateDataProvider = dataProvider("/modules/php/updateTask.php","POST",{"Content-Type": "application/json"}),
updateCategoryProvider = dataProvider("/modules/php/updateCategory.php","POST",{"Content-Type": "application/json"}),
addDataProvider = dataProvider("/modules/php/addTask.php","POST",{"Content-Type": "application/json"}),
deleteDataProvider = dataProvider("/modules/php/deleteTask.php","POST",{"Content-Type": "application/json"})


