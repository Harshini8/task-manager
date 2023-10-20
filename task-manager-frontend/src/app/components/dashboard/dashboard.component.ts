import { Component, OnInit } from '@angular/core';
import { TaskCreationComponent } from '../tasks/task-creation/task-creation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    console.log('dashboard component loaded');
  }

  createNewTask() {
    console.log('create new task');
    this.dialog.open(TaskCreationComponent, {
      width: '500px',
      height: '600px',
      autoFocus: true,
    });
  }
}
