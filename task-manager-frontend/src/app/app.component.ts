import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'task-manager';
  constructor(private spinner: NgxSpinnerService){
  }

  ngOnInit(): void {
    console.log('app component loaded');
  }
}
