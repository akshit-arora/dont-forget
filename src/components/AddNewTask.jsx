import TextInput from 'react-autocomplete-input';
import { useContext, useState } from "react";
import 'react-autocomplete-input/dist/bundle.css';
import * as tasks from '../services/tasks.js';
import { TaskContext } from '@/contexts/TaskContext.js';

export default function AddNewTask() {
    const context = useContext(TaskContext);

    const [task, setTask] = useState('');

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            tasks.addTask(task, context.hashtagToDisplay);
            setTask('');

            context.setTasks(tasks.getAllTasks());
        }
    }

    let options = tasks.getAllHashtags();

    return (
        <div>
            <TextInput
                Component={'input'}
                trigger={'#'}
                className="w-full rounded-md border border-input px-9 py-2 text-sm placeholder:text-sm mt-2"
                placeholder="Add a new task"
                onChange={(typed) => setTask(typed)}
                options={options}
                value={task}
                onKeyDown={handleEnterKey}
            />
        </div>
    );
}
