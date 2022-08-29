//mes selecteurs
const todoList = document.querySelector(".list");
const todoInput = document.querySelector(".zone");
const todoButton =document.querySelector(".todo-button");
const filterOption = document.querySelector(".filtre");
 const selectAllbtn = document.querySelector (".sltAll");
 const deleteAllbtn = document.querySelector (".dltAll");

//mes écouteurs
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('input', filterTodo);
selectAllbtn.addEventListener('click', function(){
    selectAll()
} );
deleteAllbtn.addEventListener('click', function(){
    selectAll( true)
} );


 
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
    saveLocalTodo(todoList.innerHTML);
    todoInput.value ="";
}

function deleteCheck(e) {
    const item = e.target;
    if(item.classList[0] === "trash-btn"){       
    const todo = item.parentElement;
    todo.classList.add("fall");
    console.log ("qdqsqs",todo);
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

function saveLocalTodo(listcontent){
    localStorage.setItem("todos", listcontent);
}

function getTodos(){
 let todos ;
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todoList.innerHTML = localStorage.getItem("todos");
    }
}
 
function removeLocalTodo(todo){
 let todos ;
 todo.remove()
 saveLocalTodo(todoList.innerHTML)

}
let first = true;
function selectAll (remove){
  const tableau = todoList.querySelectorAll(".todo"); 
    if(!remove ){
        tableau.forEach(function (todo){
      first ? todo.classList.add("complete") : todo.classList.remove("complete");
       console.log("toddfo: ", first);
    })
    } else {
        console.log("fq: ", remove);
        todoList.innerHTML=''
    }

if (!remove){
    first = !first
}
}

//je veux selectionner tout les elements ayant la classe todo 
// pour chaque element de list ayant la class todo ajouter la class complete 