import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskDetailService {
  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<any> {
    const options = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post('http://localhost:5000/api/createTask', task, {
      headers: options,
    });
  }

  getAllTasks(): Observable<any> {
    const options = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.get('http://localhost:5000/api/getAllTasks', {
      headers: options,
    });
  }

  deleteTask(taskId: string): Observable<any> {
    const options = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post(
      `http://localhost:5000/api/deleteTask`,{task_id: taskId},
      {
        headers: options,
      }
    );
  }

  updateTask(task: Task,taskId:string): Observable<any> {
    const options = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post(
      `http://localhost:5000/api/updateTask`,{task: task, task_id: taskId},
      {
        headers: options,
      }
    );
  }

  updateTaskStatus(taskId:string,status:string): Observable<any> {
    const options = new HttpHeaders({ 'content-type': 'application/json' });
    return this.http.post(
      `http://localhost:5000/api/updateTaskStatus`,{task_id: taskId,status:status},
      {
        headers: options,
      }
    );
  }

}
