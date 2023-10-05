const inputBox = document.getElementById("input-box");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// EVENTOS
// Escuchamos evento 'click' en el botón '+'
addTaskBtn.addEventListener('click', addNewTask);

// Escuchamos evento Enter en inputBox
inputBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addNewTask();
    }
    
})

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
        let newTask = inputBox.value;
        
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');

        listItem.innerHTML += `
            <input type="checkbox" id="checkbox">
            <input type="text" id="itemText" value=${newTask} disabled>
            <div class="actions">
                <button class="edit-btn"><i class="fa-regular fa-pen-to-square" style="color: #595959;"></i></button>
                <button class="delete-btn"><i class="fa-regular fa-circle-xmark" style="color: #595959;"></i></button>
            </div>`

        taskList.append(listItem)
        inputBox.value = ''; 

        // Escuchamos evento 'click' en delete-btn
        const deleteButton = listItem.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => deleteTask(listItem));

        // Escuchamos evento 'click' edit-btn
        const editButton = listItem.querySelector(".edit-btn");
        editButton.addEventListener("click", () => editTask(listItem));
    }
}            

// Eliminar tarea
function deleteTask(listItem) {
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
            listItem.remove();
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
}

// Editar tarea
function editTask(listItem) {
    const itemText = listItem.querySelector('#itemText');
        itemText.removeAttribute("disabled");
        itemText.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                itemText.setAttribute("disabled", "disabled");
                Toastify({
                    text: 'Tarea editada con éxito.',
                    duration: 3000,
                    gravity: 'bottom',
                    style: {
                        background: 'linear-gradient(to right, #D0A95D, #E3B029)'
                    }
                }).showToast()
            }
        })
}