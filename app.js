const data = JSON.parse(localStorage.getItem('todos')) || [];

const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');

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
        console.log('Current todos:', data);
    }
});

