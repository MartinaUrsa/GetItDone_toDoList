const inputBox = document.getElementById("input-box");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Escuchamos evento al hacer 'click' en el botón '+'
addTaskBtn.addEventListener('click', addNewTask);

// Escuchamos evento al dar Enter
inputBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addNewTask();
    }
    
})


// Función para añadir tareas
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
        listItem.classList.add('list-item')

        listItem.innerHTML += `
            <input type="checkbox" id="checkbox">
            <label class='label' for="checkbox">${newTask}</label>
            <div class="actions">
                <button class="edit-btn"><i class="fa-regular fa-pen-to-square" style="color: #595959;"></i></button>
                <button class="delete-btn"><i class="fa-regular fa-circle-xmark" style="color: #595959;"></i></button>
            </div>`

        taskList.append(listItem)
        inputBox.value = ''; 


        // Escuchamos evento al hacer click en el botón delete-btn
        const deleteButton = listItem.querySelector(".delete-btn");

        deleteButton.addEventListener("click", () => {
            listItem.remove();
        })


        // Escuchamos evento al hacer click en el botón edit-btn
        const editButton = listItem.querySelector(".edit-btn");
        
        editButton.addEventListener("click", () => {
            Swal.fire({
                title: 'Ingresa una nueva tarea:',
                input: 'text',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Guardar',
                confirmButtonColor:'#E3B029',
                inputValidator: (value) => {
                    if (!value) {
                    return '¡Cuidado! Debes ingresar algo para continuar.';
                    }
                }
                }).then((result) => {
                if (result.isConfirmed) {
                    const newTaskValue = result.value; // result.value es el valor ingresado por el usuario en el prompt de Swal
                    listItem.querySelector('.label').innerText = newTaskValue;
                }
            });
        });
    }
}

