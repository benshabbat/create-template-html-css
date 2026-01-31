// Todo List Application

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const totalCount = document.getElementById('totalCount');
const completedCount = document.getElementById('completedCount');

// Add new task
function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create new todo item
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <input type="checkbox" class="todo-checkbox">
        <span class="todo-text">${text}</span>
        <button class="delete-btn">✕</button>
    `;
    
    todoList.appendChild(li);
    todoInput.value = '';
    todoInput.focus();
    
    updateStats();
    attachEventListeners();
}

// Update statistics
function updateStats() {
    const items = document.querySelectorAll('.todo-item');
    const completed = document.querySelectorAll('.todo-item.completed');
    
    totalCount.textContent = items.length;
    completedCount.textContent = completed.length;
}

// Attach event listeners to new items
function attachEventListeners() {
    document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
        checkbox.onclick = (e) => {
            e.target.closest('.todo-item').classList.toggle('completed');
            updateStats();
        };
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = (e) => {
            e.target.closest('.todo-item').remove();
            updateStats();
        };
    });
}

// Event listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

// Initialize
attachEventListeners();
updateStats();
