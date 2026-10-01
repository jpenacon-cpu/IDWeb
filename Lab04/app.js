// 1. Selección de elementos
const form = document.querySelector('#todo-form');
const inputTitulo = document.querySelector('#todo-titulo');
const inputCurso = document.querySelector('#todo-curso');
const inputFecha = document.querySelector('#todo-fecha');
const list = document.querySelector('#todo-list');

// 2. Cargar tareas guardadas de localStorage
let tareas = JSON.parse(localStorage.getItem('tasks')) || [];
let filtroActual = 'todas';

function filtrarTareas(filtro) {
    filtroActual = filtro;

    // 1. Quitar la clase 'active' de todos los botones de filtro
    document.querySelector('#btn-todas').classList.remove('active');
    document.querySelector('#btn-pendientes').classList.remove('active');
    document.querySelector('#btn-completadas').classList.remove('active');

    // 2. Agregar la clase 'active' solo al botón presionado
    document.querySelector(`#btn-${filtro}`).classList.add('active');

    // 3. Volver a renderizar la lista
    renderTasks();
}

// 3. Función para pintar las tareas en el HTML (DOM)
function renderTasks() {
    list.innerHTML = '';

    // Filtramos las tareas usando métodos de ES6+ (.filter)
    const tareasFiltradas = tareas.filter(tarea => {
        if (filtroActual === 'pendientes') return !tarea.completada;
        if (filtroActual === 'completadas') return tarea.completada;
        return true; // 'todas'
    });

    tareasFiltradas.forEach((tarea, index) => {
        // Buscamos el índice real dentro del arreglo global 'tareas'
        const realIndex = tareas.findIndex(t => t.id === tarea.id);

        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm rounded ${tarea.completada ? 'bg-light' : ''}`;
        
        const estiloTexto = tarea.completada ? 'text-decoration-line-through text-muted' : '';

        li.innerHTML = `
            <div>
                <h6 class="mb-1 fw-bold ${estiloTexto}">${tarea.titulo}</h6>
                <small class="text-muted">Curso: ${tarea.curso} | Entrega: ${tarea.fechaEntrega}</small>
            </div>
            <div>
                <button class="btn ${tarea.completada ? 'btn-secondary' : 'btn-success'} btn-sm me-1" onclick="toggleTask(${realIndex})">
                    ${tarea.completada ? 'Desmarcar' : 'Completar'}
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${realIndex})">Eliminar</button>
            </div>
        `;

        list.appendChild(li);
    });
}
// 4. Capturar el envío del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = inputTitulo.value.trim();
    const curso = inputCurso.value.trim();
    const fechaEntrega = inputFecha.value;

    if (!titulo || !curso || !fechaEntrega) return;

    const nuevaTarea = {
        id: Date.now(),
        titulo: titulo,
        curso: curso,
        fechaEntrega: fechaEntrega,
        completada: false
    };
    const hoy = new Date().toISOString().split('T')[0];

    if (fechaEntrega < hoy) {
        alert("La fecha de entrega debe ser posterior o igual a la fecha actual.");
        return; // Detiene la ejecución si la fecha no es válida
    }

    tareas.push(nuevaTarea);
    localStorage.setItem('tasks', JSON.stringify(tareas));

    form.reset();
    
    // ---> AQUÍ ESTÁ EL TRUCO: llamamos a la función para refrescar la pantalla <---
    renderTasks(); 
});

// 5. Función para eliminar tarea
function deleteTask(index) {
    tareas.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tareas));
    renderTasks();
}
function toggleTask(index) {
    // Invierte el estado: si era false pasa a true, y viceversa
    tareas[index].completada = !tareas[index].completada; 
    localStorage.setItem('tasks', JSON.stringify(tareas));
    renderTasks(); // Volvemos a pintar para ver el cambio visual
}

// 6. Cargar automáticamente al abrir la página
document.addEventListener('DOMContentLoaded', renderTasks);