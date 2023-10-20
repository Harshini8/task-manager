import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { TaskDetailService } from 'src/services/task-services/task-detail.service';
import { Task } from 'src/models/task.model';
import * as TASK_ACTIONS from '../actions/tasks.actions';
import { exhaustMap,map } from 'rxjs';
import { ToasterService } from 'src/services/toaster-service/toaster.service';

@Injectable({
  providedIn: 'root'
})

export class taskEffects {
  constructor(
    private actions$: Actions,
    private taskService: TaskDetailService,
    private toasterService: ToasterService
  ) {}
  
  addTask$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(TASK_ACTIONS.ADD_TASK_ACTION),
        exhaustMap((action: TASK_ACTIONS.AddTaskAction) => {
        console.log("create task start effect",action.payload)
        return this.taskService.createTask(action.payload).pipe(
            map((data: Task) => {
            console.log("create task start effect",data)
                return new TASK_ACTIONS.AddTaskSuccessAction(data);
            })
        );
    }));
  })

  getTasks$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(TASK_ACTIONS.GET_TASKS_ACTION),
        exhaustMap((action: TASK_ACTIONS.GetTasksAction) => {
            console.log("get task start effect",action)
            return this.taskService.getAllTasks().pipe(
                map((data: Task[]) => {
                    console.log("get task start effect",data)
                    return new TASK_ACTIONS.GetTasksSuccessAction(data);
                })
            );
        })
    )
  })

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TASK_ACTIONS.DELETE_TASK_ACTION),
      exhaustMap((action: TASK_ACTIONS.DeleteTaskAction) => {
        console.log("delete task start effect",action)
        return this.taskService.deleteTask(action.id).pipe(
          map((data) => {
            console.log("delete task start effect",data)
            return new TASK_ACTIONS.DeleteTaskSuccessAction(data.status,action.id);
          })
        );
      }))
  })

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TASK_ACTIONS.UPDATE_TASK_ACTION),
      exhaustMap((action: TASK_ACTIONS.UpdateTaskAction) => {
        console.log("update task start effect",action)
        return this.taskService.updateTask(action.payload,action.task_id).pipe(
          map((data) => {
            if (data.success){
              return new TASK_ACTIONS.UpdateTaskSuccessAction({...action.payload,_id:action.task_id});
            }else{
              return new TASK_ACTIONS.UpdateTaskActionFail(action.payload);
            }
          })
        );
      }))
  })

  updateTaskSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TASK_ACTIONS.UPDATE_TASK_SUCCESS_ACTION),
      map((action: TASK_ACTIONS.UpdateTaskSuccessAction) => {
        console.log("task updattion success")
        this.toasterService.taskUpdationSuccess()
      })
    );
  },{dispatch:false})

  updateTaskDelete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TASK_ACTIONS.UPDATE_TASK_ACTION_FAIL),
      map((action: TASK_ACTIONS.UpdateTaskActionFail) => {
        this.toasterService.taskUpdationFailure()
      })
    );
  },{dispatch:false})

  updateTaskStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TASK_ACTIONS.UPDATE_TASK_STATUS_ACTION),
      exhaustMap((action: TASK_ACTIONS.UpdateTaskStatusAction) => {
        console.log("update task status start effect",action)
        return this.taskService.updateTaskStatus(action.task_id,action.status).pipe(
          map((data) => {
            if (data.success){
              return new TASK_ACTIONS.UpdateTaskStatusActionSuccess(action.task_id,action.status);
            }else{
              return new TASK_ACTIONS.UpdateTaskStatusActionFail(action.task_id);
            }
          })
        );
      }))
  })

  updateTaskStatusSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TASK_ACTIONS.UPDATE_TASK_STATUS_ACTION_SUCCESS),
      map((action: TASK_ACTIONS.UpdateTaskStatusActionSuccess) => {
        console.log("task updattion success")
        this.toasterService.taskUpdationSuccess()
      })
    );
  },{dispatch:false});

  updateTaskStatusFail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TASK_ACTIONS.UPDATE_TASK_STATUS_ACTION_FAIL),
      map((action: TASK_ACTIONS.UpdateTaskStatusActionFail) => {
        this.toasterService.taskUpdationFailure()
      })
    );
  },{dispatch:false})

}