const data = JSON.parse(localStorage.getItem('todos')) || [];

const searchBar = document.querySelector('#search-bar');
const searchButton = document.querySelector('#search-button');
const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');

function search() {
    // Search for items / filter the todo items based on user input.
    const searchValue = searchBar.value.toUpperCase(); // The text in searchBar
    const todoItems = Array.from(document.querySelectorAll('#todoList > li'));

    // Loop through all todo list items, and hide those who don't match the searchValue
    for (let i = 0; i < todoItems.length; i++) {
        // get the todo value from its parent
        const todoInput = todoItems[i].querySelector('#editTodoForm > input');
        const todoValue = todoInput.value;

        if (todoValue.toUpperCase().indexOf(searchValue) > -1) {
            todoItems[i].style.display = '';
        } else {
            todoItems[i].style.display = 'none';
        }
        
    }
}

searchButton.addEventListener('click', () => {
    search();
});

function renderTodos() {
    const todoList = document.querySelector('#todoList');
    todoList.innerHTML = '';
    
    data.forEach(todo => {
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