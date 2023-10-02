const inputBox = document.getElementById("input-box");
const addTaskBtn = document.getElementById("add-task-btn");

// Definimos array vacío
const tasks = [];

// Traemos al <ul> del HTML y le asignamos la clase 'list'
let taskList = document.getElementById("task-list");


// Indicamos qué ocurre al hacer 'click' en el botón '+'
addTaskBtn.addEventListener('click', () => {
    if (inputBox.value === '') {
        alert('¡Ups! Parece que no se ha ingresado ninguna nueva tarea.')
    }

    else { 
        let newTask = inputBox.value;
        tasks.push(newTask);
    
        taskList.innerHTML += `
            <li class="listItem">
                <input type="checkbox" id="checkbox">
                <label for="checkbox">${newTask}</label>
            </li> `

        inputBox.value = ''; 
    } 
});



// Versión sin checkbox de la lista (funciona bien) 
// if (inputBox.value === '') {
//     alert('¡Ups! Parece que no se ha ingresado ninguna nueva tarea.')
// }

// else { 
//     let newTask = inputBox.value;
//     tasks.push(newTask);

//     taskList.innerHTML += `<li class: listItem>${newTask}</li>`

//     inputBox.value = ''; 
//     } ;




