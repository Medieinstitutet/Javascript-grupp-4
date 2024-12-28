const data = JSON.parse(localStorage.getItem('todos')) || [];

const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');

function renderTodos() {
    const todoList = document.querySelector('#todoList');
    todoList.innerHTML = '';
    
    changedData.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <form id="editTodoForm">
                <input type="text" value="${todo.text}" readonly>
                <input id="doneCheckbox" type="checkbox" ${todo.done ? 'checked' : ''}>
                <button type="button">Delete</button>
                <button id="editSaveBtn" type="submit">Edit</button>
            </form>
        `;
        todoList.appendChild(li);
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