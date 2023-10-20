import { Task } from "src/models/task.model";
import { Action } from "@ngrx/store";

export const ADD_TASK_ACTION = 'ADD_TASK_ACTION';
export const ADD_TASK_SUCCESS_ACTION = 'ADD_TASK_SUCCESS_ACTION';
export const UPDATE_TASK_ACTION = 'UPDATE_TASK_ACTION';
export const UPDATE_TASK_SUCCESS_ACTION = 'UPDATE_TASK_SUCCESS_ACTION';
export const UPDATE_TASK_ACTION_FAIL = 'UPDATE_TASK_ACTION_FAIL';
export const DELETE_TASK_ACTION = 'DELETE_TASK_ACTION';
export const DELETE_TASK_SUCCESS_ACTION = 'DELETE_TASK_SUCCESS_ACTION';
export const GET_TASKS_ACTION = 'GET_TASKS_ACTION';
export const GET_TASKS_SUCCESS_ACTION = 'GET_TASKS_SUCCESS_ACTION';
export const UPDATE_TASK_STATUS_ACTION = 'UPDATE_TASK_STATUS_ACTION';
export const UPDATE_TASK_STATUS_ACTION_SUCCESS = 'UPDATE_TASK_STATUS_ACTION_SUCCESS';
export const UPDATE_TASK_STATUS_ACTION_FAIL = 'UPDATE_TASK_STATUS_ACTION_FAIL';


export class AddTaskAction implements Action{
    readonly type = ADD_TASK_ACTION;
    constructor(public payload: Task){}
}

export class AddTaskSuccessAction implements Action{
    readonly type = ADD_TASK_SUCCESS_ACTION;
    constructor(public payload: Task){}
}


export class UpdateTaskAction implements Action{
    readonly type = UPDATE_TASK_ACTION;
    constructor(public payload: Task,public task_id:string){}
}

export class UpdateTaskSuccessAction implements Action{
    readonly type = UPDATE_TASK_SUCCESS_ACTION;
    constructor(public payload: Task){}
}

export class UpdateTaskActionFail implements Action{
    readonly type = UPDATE_TASK_ACTION_FAIL;
    constructor(public payload: Task){}
}

export class DeleteTaskAction implements Action{
    readonly type = DELETE_TASK_ACTION;
    constructor(public id:string){}
}

export class DeleteTaskSuccessAction implements Action{
    readonly type = DELETE_TASK_SUCCESS_ACTION;
    constructor(public status:boolean,public id:string){}
}

export class GetTasksAction implements Action{
    readonly type = GET_TASKS_ACTION;
    constructor(){
        console.log("get task start action")
    }
}

export class GetTasksSuccessAction implements Action{
    readonly type = GET_TASKS_SUCCESS_ACTION;
    constructor(public payload:Task[]){}
}


export class UpdateTaskStatusAction implements Action{
    readonly type = UPDATE_TASK_STATUS_ACTION;
    constructor(public task_id:string,public status:string){}
}

export class UpdateTaskStatusActionSuccess implements Action{
    readonly type = UPDATE_TASK_STATUS_ACTION_SUCCESS;
    constructor(public task_id:string,public status:string){}
}

export class UpdateTaskStatusActionFail implements Action{
    readonly type = UPDATE_TASK_STATUS_ACTION_FAIL;
    constructor(public  task_id:string){}
}