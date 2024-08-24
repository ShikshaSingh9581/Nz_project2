document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const priorityInput = document.getElementById('priority-input');
    const dueDateInput = document.getElementById('due-date-input');
    const taskList = document.getElementById('task-list');
    const sortPriorityBtn = document.getElementById('sort-priority-btn');
    const sortDueDateBtn = document.getElementById('sort-due-date-btn');

    let tasks = [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                ${task.description} (Priority: ${task.priority}, Due: ${task.dueDate})
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Add task
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const newTask = {
            description: taskInput.value,
            priority: priorityInput.value,
            dueDate: dueDateInput.value,
            completed: false,
        };
        tasks.push(newTask);
        renderTasks();
        taskForm.reset();
    });

    // Delete task
    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        renderTasks();
    };

    // Edit task
    window.editTask = function (index) {
        const newDescription = prompt('Edit task description:', tasks[index].description);
        const newPriority = prompt('Edit task priority (1-3):', tasks[index].priority);
        const newDueDate = prompt('Edit due date (YYYY-MM-DD):', tasks[index].dueDate);
        
        if (newDescription && newPriority && newDueDate) {
            tasks[index].description = newDescription;
            tasks[index].priority = newPriority;
            tasks[index].dueDate = newDueDate;
            renderTasks();
        }
    };

    // Toggle task completion
    window.toggleComplete = function (index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    // Sort by priority
    sortPriorityBtn.addEventListener('click', function () {
        tasks.sort((a, b) => a.priority - b.priority);
        renderTasks();
    });

    // Sort by due date
    sortDueDateBtn.addEventListener('click', function () {
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        renderTasks();
    });

    renderTasks();
});
