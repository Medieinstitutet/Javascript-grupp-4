const data = JSON.parse(localStorage.getItem('todos')) || [];

const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');

function handleTodoStatusChange(e) {
    const todoId = Number(e.target.dataset.id);
    const todoIndex = data.findIndex(item => item.id === todoId);
    
    if (todoIndex !== -1) {
        data[todoIndex].done = e.target.checked;
        localStorage.setItem('todos', JSON.stringify(data));
    }
}

function renderTodos() {
    const todoList = document.querySelector('#todoList');
    todoList.innerHTML = '';
    
    data.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <form id="editTodoForm">
                <input type="text" value="${todo.text}" readonly>
                <input id="doneCheckbox" type="checkbox" ${todo.done ? 'checked' : ''} data-id="${todo.id}">
                <button type="button">Delete</button>
                <button id="editSaveBtn" type="submit">Edit</button>
            </form>
        `;
        todoList.appendChild(li);
        
        const checkbox = li.querySelector('#doneCheckbox');
        checkbox.addEventListener('change', handleTodoStatusChange);
    });
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    
    if (todoText) {
        const newTodo = {
            id: Date.now(),
            text: todoText,
            done: false,
            createdAt: new Date().toISOString()
        };
        
        data.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(data));
        
        todoInput.value = '';
        renderTodos();
    }
});

renderTodos();