import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Tasks from './components/Tasks'
import Menu from './layout/Menu'
import * as taskService from './services/tasks'
import { TaskContext } from './contexts/TaskContext'

function App() {

    const [hashtagToDisplay, setHashtagToDisplay] = useState('');
    const [tasks, setTasks] = useState(taskService.getAllTasks());
    const [durationToDisplay, setDurationToDisplay] = useState('');

    useEffect(() => {
        setTasks(taskService.getAllTasks(hashtagToDisplay));
    }, [hashtagToDisplay]);

    return (
        <div id='app'>
            <div className='flex min-h-screen w-full flex-col'>
                {/* <Menu /> */}
                <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10'>
                    <TaskContext.Provider value={{ tasks, setTasks, hashtagToDisplay, setHashtagToDisplay, durationToDisplay, setDurationToDisplay }}>
                        <div className="mx-auto grid w-full max-w-6xl gap-2">
                            <h1 className="text-3xl font-semibold">
                                Don't forget {hashtagToDisplay !== '' && `#${hashtagToDisplay}`}
                            </h1>
                        </div>
                        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                            <Sidebar />
                            <Tasks />
                        </div>
                    </TaskContext.Provider>
                </main>
            </div>
        </div>
    )
}

export default App
