import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  taskCreationSuccess() {
    this.toastr.success('Task Created Successfully');
  }

  taskCreationFailure() {
    this.toastr.error('Task Creation Failed');
  }

  taskUpdationSuccess() {
    console.log('task updation success')
    this.toastr.success('Task Updated Successfully');
  }

  taskUpdationFailure() {
    this.toastr.error('Task Updation Failed');
  }

  taskDeletionSuccess() {
    this.toastr.success('Task Deleted Successfully');
  }

  taskDeletionFailure() {
    this.toastr.error('Task Deletion Failed');
  }

  userCreationSuccess() {
    this.toastr.success('User Created Successfully');
  }

  userCreationFailure() {
    this.toastr.error('User Creation Failed');
  }
}
