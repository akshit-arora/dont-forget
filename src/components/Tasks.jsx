import { useContext, useEffect, useState } from "react";
import AddNewTask from "./AddNewTask";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import * as tasksService from '../services/tasks.js';
import { Trash } from "lucide-react";
import { TaskContext } from "@/contexts/TaskContext";

export default function Tasks () {
    const context = useContext(TaskContext);

    const toggleTask = (index) => {
        tasksService.toggleTask(index);

        context.setTasks(tasksService.getAllTasks(context.hashtagToDisplay));
    }

    const deleteTask = (index) => {
        tasksService.deleteTask(index);

        context.setTasks(tasksService.getAllTasks(context.hashtagToDisplay));
    }

    return (
        <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
                <CardContent>
                    <AddNewTask />
                    <Table className="w-full mt-2">
                        <TableBody>
                            {context.tasks.map((task, index) => (
                                <TableRow className="group" key={index}>
                                    <TableCell className="w-[5%]">
                                        <Checkbox onClick={() => toggleTask(index)} checked={task.isCompleted} />
                                    </TableCell>
                                    <TableCell className="flex items-center gap-2">
                                        <a
                                            href="#"
                                            className="text-foreground transition-colors hover:text-foreground"
                                        >
                                            {task.message}
                                        </a>
                                    </TableCell>
                                    <TableCell className="w-[5%]">
                                        <a
                                            href="#"
                                            className="text-foreground transition-colors hover:text-foreground"
                                        >
                                            <Trash
                                                className="h-4 w-4 hidden group-hover:block text-red-600"
                                                onClick={() => deleteTask(index)}
                                            />
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
