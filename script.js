document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to local storage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Function to render tasks
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.pinned) {
                li.classList.add('pinned');
            }

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            const pinButton = document.createElement('button');
            pinButton.textContent = task.pinned ? 'Unpin' : 'Pin';
            pinButton.classList.add('pin-button');
            pinButton.addEventListener('click', () => {
                tasks[index].pinned = !tasks[index].pinned;
                saveTasks();
                renderTasks();
            });

            buttonContainer.appendChild(pinButton);
            buttonContainer.appendChild(deleteButton);
            li.appendChild(buttonContainer);
            taskList.appendChild(li);
        });
    };

    // Add new task
    addTaskButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            tasks.push({ text: task, pinned: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    // Render tasks on initial load
    renderTasks();
});
