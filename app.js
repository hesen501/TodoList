const form= document.querySelector("#todo-form")
const todoInput=document.querySelector('#todo')
const todolist=document.querySelector('.list-group')
const firstCartBody=document.querySelector("#firstCartBody")
const secondcartbody= document.querySelector('#secondCartBody')
const filter=document.querySelector('#filter')
const clearbutton= document.querySelector('#clear-todos')
eventListener()
function eventListener(){
    form.addEventListener('submit',addTodo)
    document.addEventListener('DOMContentLoaded',loadAllTodotoUI)
    secondcartbody.addEventListener('click',deletetodo)
    filter.addEventListener('keyup',filterTodos)
    clearbutton.addEventListener("click",clearAllTodos)
}
function clearAllTodos(){
    if(confirm('are you sure you want to delete all Todos?')){
        while(todolist!==null){
            todolist.removeChild(todolist.firstElementChild)
        }
        localStorage.removeItem('todos')
    }
}
function filterTodos(e){
    const filterValue=e.target.value.toLowerCase()
    const listItems= document.querySelectorAll('.list-group-item')
    listItems.forEach(listItem => {
        const text=listItem.textContent.toLowerCase()
        if(text.indexOf(filterValue)===-1){
            console.log(filterValue)
            //not found
            listItem.setAttribute('style','display : none !important')
        }else{
            listItem.setAttribute('style','display : block')
        }
    });
}
function deletetodo(e){
    if(e.target.className==='fa fa-remove'){
        e.target.parentElement.parentElement.remove()
        deleteTodofromStorage(e.target.parentElement.parentElement.textContent)
        showAlert('success','deleted successfully')
    }
    
}
function deleteTodofromStorage(deletetodo){
      let todos=getTodofromStorage()

    var index
    for(var i =0;i<todos.length;i++){
        if(todos[i]===deletetodo){
            index=i
            break
        }

    }
        todos.splice(index,1)  
        localStorage.setItem('todos',JSON.stringify(todos))
}
function loadAllTodotoUI(){
     let todos=getTodofromStorage()
     todos.forEach(function (todo) {
        addTodotoUI(todo)
     });
}

function addTodo(e){
    const newTodo=todoInput.value.trim()
    if(newTodo===''){
        showAlert('danger','please add a todo')
    }else{
        addTodotoUI(newTodo)
        addTodotoStorage(newTodo)
        showAlert('success','todo was added successfully')
    }
    e.preventDefault()
}
function getTodofromStorage(){
    let todos
    if(localStorage.getItem('todos')===null){
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem('todos'))
    }
    return todos

}
function addTodotoStorage(newTodo){
    let todos=getTodofromStorage()
    
    todos.push(newTodo)
    localStorage.setItem('todos',JSON.stringify(todos))
}
function showAlert(type,message){
    const alert= document.createElement('div')    
    alert.className=`alert alert-${type}`
    alert.textContent=message
    firstCartBody.appendChild(alert)
    setTimeout(function() {
        alert.remove();
    }, 1000);

}
function addTodotoUI(newTodo){
    //create a list item
    const listItem= document.createElement("li")
    //create a link
    const link=document.createElement('a')
    link.href='#'
    link.className='delete-item'
    link.innerHTML='<i class = "fa fa-remove"> </i>'

    listItem.className='list-group-item d-flex justify-content-between'
    listItem.id='list-item'
    //add a text note
    listItem.appendChild(document.createTextNode(newTodo))
    listItem.appendChild(link)
    todolist.appendChild(listItem)


}
