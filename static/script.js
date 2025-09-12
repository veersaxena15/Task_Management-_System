// static/script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const categoryForm = document.getElementById('category-form');
    const taskList = document.getElementById('task-list');
    const categorySelect = document.getElementById('category-select');
    const filterStatus = document.getElementById('filter-status');

    // Function to get CSRF token from cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');

    const apiHeaders = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
    };

    // Fetch and display categories
    const fetchCategories = async () => {
        const response = await fetch('/api/categories/');
        const categories = await response.json();
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            categorySelect.appendChild(option);
        });
    };

    // Fetch and display tasks
    const fetchTasks = async () => {
        const status = filterStatus.value;
        let url = '/api/tasks/';
        if (status !== 'all') {
            url += `?status=${status}`;
        }

        const response = await fetch(url);
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.status}`;
            taskItem.innerHTML = `
                <div class="info">
                    <h4>${task.title}</h4>
                    <p>${task.description || ''}</p>
                    <small>Due: ${task.due_date || 'N/A'} | Category: ${task.category ? task.category.name : 'None'}</small>
                </div>
                <div class="actions">
                    <button class="status-btn" data-id="${task.id}" data-status="${task.status}">
                        ${task.status === 'pending' ? 'Complete' : 'Pending'}
                    </button>
                    <button class="edit-btn" data-id="${task.id}">Edit</button>
                    <button class="delete-btn" data-id="${task.id}">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    // Handle Task Form submission (Create/Update)
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskId = document.getElementById('task-id').value;
        const data = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            due_date: document.getElementById('due-date').value || null,
            category_id: categorySelect.value,
        };

        const url = taskId ? `/api/tasks/${taskId}/` : '/api/tasks/';
        const method = taskId ? 'PUT' : 'POST';

        await fetch(url, {
            method: method,
            headers: apiHeaders,
            body: JSON.stringify(data),
        });

        taskForm.reset();
        document.getElementById('task-id').value = '';
        fetchTasks();
    });

    // Handle Category Form submission
    categoryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('new-category-name').value;
        await fetch('/api/categories/', {
            method: 'POST',
            headers: apiHeaders,
            body: JSON.stringify({ name }),
        });
        categoryForm.reset();
        fetchCategories();
    });

    // Handle clicks on task buttons (Edit, Delete, Status Change)
    taskList.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        if (e.target.classList.contains('delete-btn')) {
            await fetch(`/api/tasks/${id}/`, { method: 'DELETE', headers: apiHeaders });
            fetchTasks();
        } else if (e.target.classList.contains('status-btn')) {
            const currentStatus = e.target.dataset.status;
            const newStatus = currentStatus === 'pending' ? 'complete' : 'pending';
            await fetch(`/api/tasks/${id}/`, {
                method: 'PATCH',
                headers: apiHeaders,
                body: JSON.stringify({ status: newStatus }),
            });
            fetchTasks();
        } else if (e.target.classList.contains('edit-btn')) {
            const response = await fetch(`/api/tasks/${id}/`);
            const task = await response.json();
            document.getElementById('task-id').value = task.id;
            document.getElementById('title').value = task.title;
            document.getElementById('description').value = task.description;
            document.getElementById('due-date').value = task.due_date;
            categorySelect.value = task.category ? task.category.id : '';
            window.scrollTo(0, 0);
        }
    });

    // Filter tasks when status changes
    filterStatus.addEventListener('change', fetchTasks);

    // Initial fetch
    fetchCategories();
    fetchTasks();
});