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


// FUNCIONES
// Añadir tareas
function addNewTask() {
    if (inputBox.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Parece que no haz ingresado ninguna tarea.',
            width: 400,
            confirmButtonColor: '#1C4662',
        })
    }
    else { 
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');

        let newTask = inputBox.value;

        tasks.push(newTask);

        listItem.innerHTML += `
            <input type="checkbox" id="checkbox">
            <input type="text" id="itemText" value="${newTask}" disabled>
            <div class="actions">
                <button class="edit-btn"><i class="fa-regular fa-pen-to-square" style="color: #595959;"></i></button>
                <button class="delete-btn"><i class="fa-regular fa-circle-xmark" style="color: #595959;"></i></button>
            </div>`

        taskList.appendChild(listItem)
        inputBox.value = '';

        // Llamamos a la función saveTaskToStorage() para guardar el nuevo array con la newTask
        saveTaskToStorage(tasks);

        // Llamamos a función deleteTask() para que pueda acceder al listItem
        deleteTask(listItem);

        // Llamamos a función editTask() para que pueda acceder al listItem
        editTask(listItem);

        // Escuchamos evento 'change' en checkbox
        const checkbox = listItem.querySelector('#checkbox');
        checkbox.addEventListener("change", () => completedTask(listItem, checkbox));

        // Guardamos tarea en storage
        saveTaskToStorage(tasks);
    };
};

function showTasks(tasks) {
    taskList.innerHTML = '';

    tasks.forEach(newTask => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');
        listItem.innerHTML += `
            <input type="checkbox" id="checkbox">
            <input type="text" id="itemText" value="${newTask}" disabled>
            <div class="actions">
                <button class="edit-btn"><i class="fa-regular fa-pen-to-square" style="color: #595959;"></i></button>
                <button class="delete-btn"><i class="fa-regular fa-circle-xmark" style="color: #595959;"></i></button>
            </div>`
    
        taskList.appendChild(listItem)

        // Aplicamos eventos a listItems tomados del localStorage 
        deleteTask(listItem);
        editTask(listItem);

        const checkbox = listItem.querySelector('#checkbox');
        checkbox.addEventListener("change", () => completedTask(listItem, checkbox));
        
    });
};

// Guardar tareas en el localStorage
function saveTaskToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTaskStorage() {
    const tasksStorage = JSON.parse(localStorage.getItem('tasks'));
    return tasksStorage;
}

function getTasks() {
    if(localStorage.getItem('tasks')) {
        tasks = getTaskStorage();
        showTasks(tasks);
    };
};

// Eliminar tarea
function deleteTask(listItem) {
    const deleteButton = listItem.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => {
        Swal.fire({
            icon: 'warning',
            title: `¡Está por eliminar una tarea! ¿Avanzamos?`,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar',
            confirmButtonColor:'#E3B029',
            width: 400,
            }).then((result) => {
            if (result.isConfirmed) {
                // Eliminamos task de array tasks
                const itemText = listItem.querySelector('#itemText');
                const taskIndex = tasks.indexOf(itemText.value);
                tasks.splice(taskIndex, 1);

                // Eliminamos tasks de taskList
                listItem.remove();

                // Actualizamos localStorage
                saveTaskToStorage(tasks);

                Toastify({
                    text: 'Tarea eliminada correctamente.',
                    duration: 3000,
                    gravity: 'bottom',
                    style: {
                        background: 'linear-gradient(to right, #D0A95D, #E3B029)'
                    }
                }).showToast();
            }
        });
    });
}

// Editar tarea
function editTask(listItem) {
    const editButton = listItem.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
        const itemText = listItem.querySelector('#itemText');
        const taskIndex = tasks.indexOf(itemText.value);
        itemText.removeAttribute("disabled");
        itemText.focus();
        itemText.setSelectionRange(itemText.value.length, itemText.value.length);

        itemText.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                if(itemText.value.length === 0) {
                    listItem.remove();
                    tasks.splice(taskIndex, 1);
                    // Actualizamos localStorage
                    saveTaskToStorage(tasks);

                } else {
                    itemText.setAttribute("disabled", "disabled");
                    tasks[taskIndex] = itemText.value;
                    // Actualizamos localStorage
                    saveTaskToStorage(tasks);

                    Toastify({
                        text: 'Tarea editada con éxito.',
                        duration: 3000,
                        gravity: 'bottom',
                        style: {
                            background: 'linear-gradient(to right, #D0A95D, #E3B029)'
                        }
                    }).showToast()
                }
            }
        })
    });
}

// Completar tarea
function completedTask(listItem, checkbox) {
    if(checkbox.checked) {
        listItem.classList.add("completed")
    } else {
        listItem.classList.remove("completed")
    }
}

