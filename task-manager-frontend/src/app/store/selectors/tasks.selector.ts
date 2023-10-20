import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from '../states/tasks.state';

export const TASK_STATE_NAME = 'tasks';
export const getTasksState = createFeatureSelector<TasksState>(TASK_STATE_NAME);

export const getTasks = createSelector(getTasksState, (state: TasksState) => {
    return state;
});
