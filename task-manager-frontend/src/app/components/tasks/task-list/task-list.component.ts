import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeleteTaskAction, GetTasksAction, UpdateTaskStatusAction } from 'src/app/store/actions/tasks.actions';
import { getTasks } from 'src/app/store/selectors/tasks.selector';
import { Observable } from 'rxjs';
import { TasksState } from 'src/app/store/states/tasks.state';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreationComponent } from '../task-creation/task-creation.component';
import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<TasksState>;

  constructor(private store:Store,private dialog:MatDialog) {
    this.tasks$=this.store.select(getTasks)
    
  }

  ngOnInit(): void {
    this.store.dispatch(new GetTasksAction());
    this.tasks$.forEach((task) => {
      console.log('task list', task);
    })
  }

  deleteTask(id:any){
    console.log("delete task",id)
    this.store.dispatch(new DeleteTaskAction(id))
  }

  editTask(task:Task){
    console.log("edit task",task)
    this.dialog.open(TaskCreationComponent, {
      width: '500px',
      height: '600px',
      autoFocus: true,
      data:task
    })
  }

  updateStatus(task_id:any,status:string){
    console.log(status)
    this.store.dispatch(new UpdateTaskStatusAction(task_id,status))
  }

}
