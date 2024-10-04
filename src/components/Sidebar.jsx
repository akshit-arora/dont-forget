import { useContext, useEffect, useState } from "react";
import * as taskService from '../services/tasks.js';
import { TaskContext } from "@/contexts/TaskContext.js";

export default function Sidebar() {
    const context = useContext(TaskContext);
    let [hashtags, setHashtags] = useState(taskService.getAllHashtags());

    useEffect(() => {
        setHashtags(taskService.getAllHashtags());
    }, [context.tasks]);

    return (
        <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
        >
            <a
                href="#"
                className={context.hashtagToDisplay === '' ? 'font-semibold text-primary' : 'text-foreground transition-colors hover:text-foreground'}
                onClick={() => context.setHashtagToDisplay('')}
            >
                All tasks
            </a>
            {hashtags.map((hashtag, index) => (
                <a
                    key={index}
                    href="#"
                    className={context.hashtagToDisplay === hashtag ? 'font-semibold text-primary' : 'text-foreground transition-colors hover:text-foreground'}
                    onClick={() => context.setHashtagToDisplay(hashtag)}
                >
                    #{hashtag}
                </a>
            ))}
            <hr />
        </nav>

    );
}
