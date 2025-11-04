document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input'); // Input untuk catatan/tugas baru
    const addBtn = document.getElementById('add-btn'); // Tombol Add
    const taskList = document.getElementById('task-list'); // Daftar tugas

    // Load tugas dari localStorage saat halaman dimuat
    loadTasks();

    // Event untuk menambah tugas melalui tombol Add
    addBtn.addEventListener('click', addTask);

    // Event untuk menambah tugas dengan menekan Enter di input
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Fungsi untuk menambah tugas baru
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return; // Jangan tambah jika input kosong

        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        saveTasks(); // Simpan ke localStorage
        taskInput.value = ''; // Kosongkan input setelah tambah
    }

    // Fungsi untuk membuat elemen tugas baru
    function createTaskElement(text) {
        const li = document.createElement('li');
        li.className = 'task-item';

        // Checkbox untuk menandai selesai
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
            saveTasks(); // Simpan perubahan
        });

        // Teks tugas
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = text;

        // Tombol Delete
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li); // Hapus elemen dari DOM
            saveTasks(); // Simpan perubahan
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        return li;
    }

    // Fungsi untuk menyimpan tugas ke localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(item => {
            tasks.push({
                text: item.querySelector('.task-text').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Fungsi untuk memuat tugas dari localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = createTaskElement(task.text);
            if (task.completed) {
                taskItem.classList.add('completed');
                taskItem.querySelector('input[type="checkbox"]').checked = true;
            }
            taskList.appendChild(taskItem);
        });
    }
});