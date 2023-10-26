// Añadir tareas
function addNewTask() {
    if (inputBox.value.trim().length !== 0) {
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');

        let newTask = {task: inputBox.value, status: 'active', id: Math.random()};

        tasks.push(newTask);

        listItem.innerHTML += `
            <input type="checkbox" id="checkbox">
            <input type="text" id="itemText" value="${newTask.task}" disabled>
            <div class="actions">
                <button class="edit-btn"><i class="fa-regular fa-pen-to-square" style="color: #595959;"></i></button>
                <button class="delete-btn"><i class="fa-regular fa-circle-xmark" style="color: #595959;"></i></button>
            </div>`

        taskList.appendChild(listItem);
        inputBox.value = '';

        // Llamamos a la función saveTaskToStorage() para guardar el nuevo array con la newTask
        saveTaskToStorage(tasks);

        // Llamamos a función deleteTask() para que pueda acceder al listItem
        deleteTask(listItem);

        // Llamamos a función editTask() para que pueda acceder al listItem
        editTask(listItem);

        // Escuchamos evento 'change' en checkbox
        completedTask(listItem);
    }
    else { 
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Parece que no haz ingresado ninguna tarea.',
            width: 400,
            confirmButtonColor: '#1C4662',
        })
    };
};


// Completar tarea
function completedTask(listItem) {
    let checkbox = listItem.querySelector('#checkbox');
    checkbox.addEventListener("change", () => {
        if(checkbox.checked) {
            listItem.classList.add("completed");
            const itemText = listItem.querySelector('#itemText');
            const taskIndex = tasks.findIndex(newTask => newTask.task === itemText.value);
            if(taskIndex !== -1) {
                tasks[taskIndex].status = 'completed';
                saveTaskToStorage(tasks);
            }
        } else {
            listItem.classList.remove("completed");
            const itemText = listItem.querySelector('#itemText');
            const taskIndex = tasks.findIndex(newTask => newTask.task === itemText.value);
            if(taskIndex !== -1) {
                tasks[taskIndex].status = 'active';
                saveTaskToStorage(tasks);            
            }
        }
    });
}


// Editar tarea
function editTask(listItem) {
    const editButton = listItem.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
        const itemText = listItem.querySelector('#itemText');
        const taskIndex = tasks.findIndex(newTask => newTask.task === itemText.value);
        console.log(tasks);
        console.log(taskIndex);
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
                    tasks[taskIndex].task = itemText.value;
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
                const taskIndex = tasks.findIndex(newTask => newTask.task === itemText.value);
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

