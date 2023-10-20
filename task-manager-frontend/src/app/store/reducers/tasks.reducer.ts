import {TasksState } from "../states/tasks.state";

export function TasksReducer(state:TasksState, action:any): TasksState {
    console.log('tasks reducer', state, action);
    switch (action.type) {
        case 'ADD_TASK_SUCCESS_ACTION':
            console.log('add task start reducer', action);
            console.log(state.tasks)
            return {
                ...state,
                tasks: [action.payload.task, ...state.tasks],
            };
        case 'GET_TASKS_SUCCESS_ACTION':
            console.log('get task start reducer', action);
            return {
                ...state,
                tasks: action.payload.tasks,
            };
        case 'DELETE_TASK_SUCCESS_ACTION':
            console.log('delete task start reducer', action);
            return {
                ...state,
                tasks: state.tasks.filter((task) => task._id !== action.id),
            };
        case 'UPDATE_TASK_SUCCESS_ACTION':
            console.log('update task start reducer', action);
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return task;
                    }
                }),
            };
        case 'UPDATE_TASK_STATUS_ACTION_SUCCESS':
            console.log('update task status start reducer', action);
            return {
                ...state,
                tasks: state.tasks.map((task) => {
                    if (task._id === action.task_id) {
                        console.log("update task status start reducer",action.status)
                        return {...task,status:action.status};
                    }
                    else{
                        return task;
                    }})};
        default:
            return state;
    }
}