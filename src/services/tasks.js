export function addTask(task, hashtag = '') {
    task = task.trim();

    // Get the date, day or time from the task
    const timebased = checkTimeBasedText(task);

    if (hashtag !== '' && !task.includes('#' + hashtag)) {
        task = task + ' #' + hashtag;
    }

    let tasks = getAllTasks();

    tasks.unshift({
        id: Date.now(),
        message: task,
        isCompleted: false
    });

    saveTasks(tasks);
}

export function getAllTasks(hashtag = '') {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    let tasksToDisplay = [];

    if (hashtag !== '') {
        tasks.forEach(task => {
            if (task.message.includes('#' + hashtag)) {
                tasksToDisplay.push(task);
            }
        });
    } else {
        tasksToDisplay = tasks;
    }

    return tasksToDisplay;
}

export function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function getAllHashtags() {
    const tasks = getAllTasks();
    let hashtags = [];

    tasks.forEach(task => {
        const regex = /#(\w+)/g;
        let match;
        while ((match = regex.exec(task.message)) !== null) {
            const hashtag = match[1];

            if (!hashtags.includes(hashtag)) {
                hashtags.push(hashtag);
            }
        }
    });

    return hashtags;
}

export function deleteTask(index) {
    let tasks = getAllTasks();

    tasks.splice(index, 1);

    saveTasks(tasks);
}

export function toggleTask(index) {
    let tasks = getAllTasks();

    tasks[index].isCompleted = !tasks[index].isCompleted;

    saveTasks(tasks);
}
