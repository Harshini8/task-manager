import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDetailService } from 'src/services/auth-services/user-detail.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AddTaskAction, UpdateTaskAction } from 'src/app/store/actions/tasks.actions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Task } from 'src/models/task.model';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.css'],
})
export class TaskCreationComponent implements OnInit {
  taskForm!: FormGroup;
  categories: string[] = ['front-end', 'back-end', 'testing', 'deployment'];
  priorities: string[] = ['High', 'Medium', 'Low'];
  collaborators: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userDetailsService: UserDetailService,
    private dialogRef: MatDialogRef<DashboardComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('task creation component loaded');
    console.log(data)
  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: [this.data ? this.data.title : '', Validators.required],
      description: [this.data ? this.data.description : '', Validators.required],
      dueDate: [this.data ? this.data.dueDate : '', Validators.required],
      category: [this.data ? this.data.category : '', Validators.required],
      priority: [this.data ? this.data.priority : '', Validators.required],
      collaborators: [this.data ? this.data.collaborators : ''],
    });

    this.userDetailsService.getAllUsers().subscribe((data: any) => {
      this.collaborators = data['users'];
    });
  }

  createTask() {
    if (this.taskForm.invalid) {
      return;
    }

    const task = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      dueDate: this.taskForm.value.dueDate,
      category: this.taskForm.value.category,
      priority: this.taskForm.value.priority,
      collaborators: this.taskForm.value.collaborators,
      status: 'open',
    };

    this.store.dispatch(new AddTaskAction(task));
    this.taskForm.reset();
  }

  updateTask(){
    console.log(this.taskForm.value,this.data._id)
    this.store.dispatch(new UpdateTaskAction({...this.taskForm.value,status:'open'},this.data._id));
    this.dialogRef.close();
  }

}
