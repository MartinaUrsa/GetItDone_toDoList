const inputBox = document.getElementById("input-box");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

let tasks = [];

// EVENTOS
// Escuchamos evento 'click' en el botón '+'
addTaskBtn.addEventListener('click', addNewTask);

// Escuchamos evento Enter en inputBox
inputBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addNewTask();
    }  
});

// Escuchamos evento de carga de la página
document.addEventListener('DOMContentLoaded', getTasks);



// LOCALSTORAGE
// Guardar tareas en el localStorage
function saveTaskToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Tomar las tareas del storage y parsearlas
function getTaskStorage() {
    const tasksStorage = JSON.parse(localStorage.getItem('tasks'));
    return tasksStorage;
}

// Mostrar tareas del storage en el DOM
function showTasks(tasks) {
    taskList.innerHTML = '';

    tasks.forEach(newTask => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');
        listItem.innerHTML += `
            <input type="checkbox" id="checkbox">
            <input type="text" id="itemText" value="${newTask.task}" disabled>
            <div class="actions">
                <button class="edit-btn"><i class="fa-regular fa-pen-to-square" style="color: #595959;"></i></button>
                <button class="delete-btn"><i class="fa-regular fa-circle-xmark" style="color: #595959;"></i></button>
            </div>`
        
        let checkbox = listItem.querySelector('#checkbox');
        if(newTask.status === 'completed') {
            checkbox.checked = true;
            listItem.classList.add("completed");
        }
        
        taskList.appendChild(listItem)

        // Aplicamos eventos a listItems tomados del localStorage 
        deleteTask(listItem);
        editTask(listItem);
        completedTask(listItem);

    });
};

// Verificar si hay tareas en el storage y llamar a la función showTasks()
function getTasks() {
    if(localStorage.getItem('tasks')) {
        tasks = getTaskStorage();
        showTasks(tasks);
    };
};