import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from './material-module/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TaskCreationComponent } from './components/tasks/task-creation/task-creation.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { taskEffects } from './store/effects/tasks.effects';
import { TasksReducer } from './store/reducers/tasks.reducer';
import { provideToastr } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoadingSpinnerComponent,
    TaskCreationComponent,
    TaskListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('tasks', TasksReducer),
    EffectsModule.forFeature([taskEffects]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideToastr(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
