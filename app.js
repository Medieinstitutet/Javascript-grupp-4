const data = JSON.parse(localStorage.getItem('todos')) || [];

const searchBar = document.querySelector('#search-bar');
const searchButton = document.querySelector('#search-button');
const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList'); 
const eraseAllButton = document.querySelector('#eraseAllBtn'); 


function search() {
  const searchValue = searchBar.value.toUpperCase();
  const todoItems = Array.from(todoList.querySelectorAll('li'));

  todoItems.forEach((item) => {
    const todoInput = item.querySelector('#editTodoForm > input');
    const todoValue = todoInput.value;

    if (todoValue.toUpperCase().includes(searchValue)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

searchButton.addEventListener('click', search);
searchBar.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') search();
});


function handleTodoStatusChange(e) {
  const todoId = Number(e.target.dataset.id);
  const todoIndex = data.findIndex((item) => item.id === todoId);

  if (todoIndex !== -1) {
    data[todoIndex].done = e.target.checked;
    localStorage.setItem('todos', JSON.stringify(data));
  }
}

function renderTodos() {
  todoList.innerHTML = '';

  data.forEach((todo) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <form id="editTodoForm">
        <input type="text" value="${todo.text}" readonly>
        <input id="doneCheckbox" type="checkbox" ${
          todo.done ? 'checked' : ''
        } data-id="${todo.id}">
        <button type="button">Delete</button>
        <button id="editSaveBtn" type="submit">Edit</button>
      </form>
    `;
    todoList.appendChild(li);

    const checkbox = li.querySelector('#doneCheckbox');
    checkbox.addEventListener('change', handleTodoStatusChange);

    const editForm = li.querySelector('#editTodoForm');
    editForm.addEventListener('submit', handleEditTodo);
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
      createdAt: new Date().toISOString(),
    };

    data.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(data));

    todoInput.value = '';
    renderTodos();
  }
});

function handleEditTodo(e) {
  e.preventDefault();
  const li = e.target.closest('li');
  const form = li.querySelector('#editTodoForm');
  const input = form.querySelector('input[type="text"]');
  const editSaveBtn = form.querySelector('#editSaveBtn');

  if (editSaveBtn.textContent === 'Edit') {
    input.removeAttribute('readonly');
    input.focus();
    editSaveBtn.textContent = 'Save';
  } else {
    const todoId = Number(li.querySelector('#doneCheckbox').dataset.id);
    const todoIndex = data.findIndex((item) => item.id === todoId);

    if (todoIndex !== -1) {
      data[todoIndex].text = input.value.trim();
      localStorage.setItem('todos', JSON.stringify(data));
      input.setAttribute('readonly', true);
      editSaveBtn.textContent = 'Edit';
    }
  }
}


function eraseAllTodos() {
  if (confirm('Är du säker på att du vill rensa alla uppgifter?')) {
    data.length = 0; 
    localStorage.removeItem('todos'); 
    todoList.innerHTML = '';
    console.log('Alla uppgifter rensade!');
  }
}

eraseAllButton.addEventListener('click', eraseAllTodos);

renderTodos();
