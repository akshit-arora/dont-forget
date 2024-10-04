import { createContext } from "react";

export const TaskContext = createContext({
    tasks: [],
    setTasks: () => {},
    hashtagToDisplay: '',
    setHashtagToDisplay: () => {},
    durationToDisplay: '',
    setDurationToDisplay: () => {},
})
