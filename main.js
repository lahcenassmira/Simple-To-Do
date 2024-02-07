let inputText = document.querySelector(".input");
let btnAdd = document.querySelector(".add");
let addTasks = document.querySelector(".tasks");


window.addEventListener('load', function() {
   
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        JSON.parse(savedTasks).forEach(task => {
            addTaskToDOM(task);
        });
    }
});

function addTaskToDOM(taskName) {
    let mainSpan = document.createElement("span");
    let text = document.createTextNode(taskName);
    let deleteElement = document.createElement("span");
    let deleteText = document.createTextNode("Delete");
    mainSpan.className = "main-span";
    mainSpan.appendChild(text);
    deleteElement.appendChild(deleteText);
    deleteElement.className = "delete";
    mainSpan.appendChild(deleteElement);
    addTasks.appendChild(mainSpan);
    mainSpan.addEventListener("click", function() {
        addTasks.removeChild(mainSpan);
        // Remove the task from localStorage
        removeTaskFromLocalStorage(taskName);
    });
}

function addTaskToLocalStorage(taskName) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTaskFromLocalStorage(taskName) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks = tasks.filter(task => task !== taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

btnAdd.onclick = function() {
    if (inputText.value.trim() === '') {
        alert("Please enter a valid value ");
    } else {
        addTaskToDOM(inputText.value);
        addTaskToLocalStorage(inputText.value);
        inputText.value = ""; // empty value 
        inputText.focus(); // stay focus on input element 
        
    }
};
