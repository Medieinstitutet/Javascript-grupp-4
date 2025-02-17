import { makeNewTodo } from "./new-todo.js";

let data = JSON.parse(localStorage.getItem('todos')) || [];

const searchBar = document.querySelector('#search-bar');
const searchButton = document.querySelector('#search-button');
const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const filterSelect = document.querySelector('#filter-select');
const randomButton = document.querySelector('#random-button'); 
const sortItems = document.querySelector('#sort');

const todoList = document.querySelector('#todoList');
const eraseAllButton = document.querySelector('#eraseAllBtn'); 


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

searchButton.addEventListener('click', search);
searchBar.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    search();
  }
});


function updateTodoCount() {
  const count = data.length; // Number of todos in the list
  const todoCount = document.querySelector('#todoCount');
  todoCount.textContent = `Things To Do: ${count}`;
}

function handleTodoStatusChange(e) {
  const todoId = Number(e.target.dataset.id);
  const todoIndex = data.findIndex((item) => item.id === todoId);

  if (todoIndex !== -1) {
    data[todoIndex].done = e.target.checked;
    localStorage.setItem('todos', JSON.stringify(data));
  }
}

function filterTodos() {
  const filterValue = filterSelect.value; // Get selected filter value
  renderTodos(filterValue);
}

filterSelect.addEventListener('change', filterTodos);

function selectRandomTodo() {
  if (data.length === 0) {
    alert('No tasks available to select!');
    return;
  }

  // Pick a random task from the data array
  const randomTodo = data[Math.floor(Math.random() * data.length)];

  // Display the selected task to the user
  alert(`Here is your Random Task --> ${randomTodo.text} <-- Good Luck! :D`);
}

randomButton.addEventListener('click', selectRandomTodo);


function renderTodos(filter = 'all') {
  const todoList = document.querySelector('#todoList');
  todoList.innerHTML = '';

  data.forEach((todo) => {
    // Apply filtering based on the selected filter
    if (
      filter === 'done' && !todo.done ||
      filter === 'not-done' && todo.done
    ) {
      return; // Skip todos that don't match the filter
    }

    const li = document.createElement('li');
    li.innerHTML = `
            <form id="editTodoForm">
                <input type="text" value="${todo.text}" readonly>
                <input id="doneCheckbox" type="checkbox" ${
                  todo.done ? 'checked' : ''
                } data-id="${todo.id}">
                <button type="button" class="deletebtn" data-id="${
                  todo.id
                }">Delete</button>
                <button id="editSaveBtn" type="submit">Edit</button>
            </form>
        `;
    todoList.appendChild(li);

    const checkbox = li.querySelector('#doneCheckbox');
    checkbox.addEventListener('change', handleTodoStatusChange);

    const deleteBtn = li.querySelector('.deletebtn');
    deleteBtn.addEventListener('click', deleteTodo);

    const editForm = li.querySelector('#editTodoForm');
    editForm.addEventListener('submit', handleEditTodo);
  });
}

function deleteTodo(e) {
  const todoId = Number(e.target.dataset.id);
  data = data.filter((todo) => todo.id !== todoId);
  localStorage.setItem('todos', JSON.stringify(data));
  renderTodos();
  updateTodoCount(); // update count
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoText = todoInput.value.trim();

  if (todoText.length === 0) {
    showError('Please enter a todo item!');
    todoInput.value = '';
    return;
  }


  if (todoText) {
    // const newTodo = {
    //   id: Date.now(),
    //   text: todoText,
    //   done: false,
    //   createdAt: new Date().toISOString(),
    // };
    const newTodo = makeNewTodo(todoText); // returns a new todo object.

    data.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(data));

    todoInput.value = '';
    renderTodos();
    updateTodoCount(); // update count
  }
});

const showError = (message) => {
    const errorMsg = createErrorMessage(message);
    const errorDiv = document.querySelector('.error');
    
    errorDiv.innerHTML = '';
    
    errorDiv.appendChild(errorMsg);
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
      errorDiv.innerHTML = '';
      errorDiv.style.display = 'none';
    }, 2000);
};

const createErrorMessage = (message) => {
    const div = document.createElement('div');
    div.setAttribute('id', 'error-message');
    div.appendChild(document.createTextNode(message));
    div.classList.add('error-message');
    return div;
};

function handleEditTodo(e) {
  e.preventDefault();
  const li = e.target.closest('li');
  const form = li.querySelector('#editTodoForm');
  const input = form.querySelector('input[type="text"]');
  const editSaveBtn = form.querySelector('#editSaveBtn');

  if (editSaveBtn.textContent === 'Edit') {
    // Switch to edit mode
    input.removeAttribute('readonly');
    input.focus();
    editSaveBtn.textContent = 'Save';
  } else {
    // Save the edited todo
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

const sortList = () => {
    const sortOrder = sortItems.value;
  
    if (sortOrder === '1') {
      data.sort((a, b) => a.text.localeCompare(b.text));
    } else if (sortOrder === '2') {
      data.sort((a, b) => b.text.localeCompare(a.text));
    }
  
    renderTodos();
}

sortItems.addEventListener('change', sortList);
renderTodos();
updateTodoCount(); // update count

//erase all todos
function eraseAllTodos() {
  if (confirm('Är du säker på att du vill rensa alla uppgifter?')) {
    data.length = 0; // Töm arrayen
    localStorage.removeItem('todos'); // Ta bort från localStorage
    todoList.innerHTML = ''; // Töm DOM
    console.log('Alla uppgifter rensade!');
    updateTodoCount(); // update count
  }
  
  // Rendera todo-listan vid start
  renderTodos ();
}

// Koppla rensa-knappen till funktionen
eraseAllButton.addEventListener('click', eraseAllTodos);

//test