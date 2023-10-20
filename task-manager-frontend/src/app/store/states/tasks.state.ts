import { Task } from "src/models/task.model";

export interface TasksState{
    tasks: Task[] | [];
}

export const initialTasksState: TasksState = {
    tasks: [],
}