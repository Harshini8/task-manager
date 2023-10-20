import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginStart } from 'src/app/store/actions/auth.actions';
import { SpinnerService } from 'src/services/spinner-services/spinner.service';
import { AuthState } from 'src/app/store/states/auth.state';
import { getUser } from 'src/app/store/selectors/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  authStatus$: Observable<AuthState>;
  
  constructor(
    private store: Store,
    private spinner: SpinnerService
  ) {
    this.authStatus$ = this.store.select(getUser);
  }
  ngOnInit(): void {
  }
  login() {
    this.spinner.showSpinner();
    this.store.dispatch(
      new LoginStart({ email: this.email, password: this.password })
    );
  }
}
