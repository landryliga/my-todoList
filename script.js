//mes selecteurs
const todoList = document.querySelector(".list");
const todoInput = document.querySelector(".zone");
const todoButton =document.querySelector(".todo-button");
const filterOption = document.querySelector(".filtre");
const todoItem =document.querySelector(".todo-item");
 

//mes écouteurs
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('input', filterTodo);
todoItem.addEventListener('click', selectAll );




//mes fonctions
function addTodo(event) {
    event.preventDefault();
    console.log("hello");
    //pour ajouter une div avec la classe todo
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //pour creer un li   
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveLocalTodo(todoInput.value);
    
    //le boutton check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //le boutton pour supprimer 
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //ajouter todo à list
    todoList.appendChild(todoDiv);
    todoInput.value ="";
}

function deleteCheck(e) {
    const item = e.target;
    if(item.classList[0] === "trash-btn"){       
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodo(todo);
    todo.addEventListener("transitionend", function(){
        todo.remove();
    })
       
    }
    if(item.classList[0] === "complete-btn"){       
        const todo = item.parentElement;
           todo.classList.toggle("complete");
        }
}

function filterTodo(e) {
const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "complete":
                if (todo.classList.contains("complete")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncomplete":
                if (!todo.classList.contains("complete")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

        }
    })
}

function saveLocalTodo(todo){
    //verifie si il y'a des items existant
    let todos ;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
 let todos ;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //pour creer un li   
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    
    //le boutton check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //le boutton pour supprimer 
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //ajouter todo à list
    todoList.appendChild(todoDiv);
    })
}
 
function removeLocalTodo(todo){
    let todos ;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
 const todoIndex = todo.children[0].innerText;
 todos.splice(todos.indexOf(todoIndex), 1);
 localStorage.setItem("todos", JSON.stringify(todos));
}

function selectAll (){
    
    let todoItemLen =todoItem.length;
    for(var x=0; x<todoItemLen; x++) {
        todoItem[x].ClassList.add("complete");
        console.log("heloo");
    }
}