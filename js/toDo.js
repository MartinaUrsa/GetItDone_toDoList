const inputBox = document.getElementById("input-box");
const addTaskBtn = document.getElementById("add-task-btn");

// Definimos array vacío
const tasks = [];

// Traemos al <ul> del HTML y le asignamos la clase 'list'
let taskList = document.getElementById("task-list");

function addNewTask() {
    if (inputBox.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Parece que no haz ingresado ninguna tarea.',
        })
    }
    else { 
        let newTask = inputBox.value;
        tasks.push(newTask);
        
        const listItem = document.createElement('li');
        listItem.classList.add('list-item')

        listItem.innerHTML += `
            <input type="checkbox" id="checkbox">
            <label for="checkbox">${newTask}</label>
            <div class="actions">
                <button class="edit-btn"><i class="fa-regular fa-pen-to-square" style="color: #595959;"></i></button>
                <button class="delete-btn"><i class="fa-regular fa-circle-xmark" style="color: #595959;"></i></button>
            </div>`


        // Escuchamos evento al hacer click en el botón delete-btn
        const deleteButton = listItem.querySelector(".delete-btn");

        deleteButton.addEventListener("click", () => {
            listItem.remove();
            
            console.log(tasks);
        })


        taskList.appendChild(listItem)
        inputBox.value = ''; 
    

        // Escuchamos evento al hacer 'click' en el botón '+'
        addTaskBtn.addEventListener('click', addNewTask);
    }
    
}

// Escuchamos evento al dar Enter
inputBox.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addNewTask();
    }
    
})

