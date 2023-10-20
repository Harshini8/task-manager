import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AUTH_ACTIONS from '../actions/auth.actions';
import { exhaustMap,map } from 'rxjs';
import { UserDetailService } from 'src/services/auth-services/user-detail.service';
import { UserLoginStatusDetails } from 'src/models/user.model';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/services/spinner-services/spinner.service';

@Injectable()
export class AuthEffects{
    constructor(private actions$:Actions,
        private UserDetailService:UserDetailService,
        private router:Router,
        private spinner:SpinnerService
        ){}

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AUTH_ACTIONS.LOGIN_START),
            exhaustMap((action: AUTH_ACTIONS.LoginStart) => {
                console.log("login start effect",action.loginDetails)
                return this.UserDetailService.loginUser(action.loginDetails).pipe(
                    map((data: UserLoginStatusDetails) => {
                        console.log("login start effect",data)
                        if(data.success){
                        return new AUTH_ACTIONS.LoginSuccess(data);
                        }else{
                            return new AUTH_ACTIONS.LoginFailed(data.message);
                        }
                    })
                );
            })
        );
    });

    loginSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AUTH_ACTIONS.LOGIN_SUCCESS),
            map((action: AUTH_ACTIONS.LoginSuccess) => {
                console.log("login success effect")
                this.spinner.hideSpinner();
                this.router.navigate(['../dashboard']);
            })
        );
    },{dispatch:false});


    loginFailed$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AUTH_ACTIONS.LOGIN_FAILED),
            map((action: AUTH_ACTIONS.LoginFailed) => {
                console.log("login failed effect")
                this.spinner.hideSpinner();
            })
        );
    },{dispatch:false})

    signUp$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AUTH_ACTIONS.SIGNUP_START),
            exhaustMap((action: AUTH_ACTIONS.SignupStart) => {
                console.log("signup start effect",action.signupDetails)
                return this.UserDetailService.registerUser(action.signupDetails).pipe(
                    map((data: UserLoginStatusDetails) => {
                        console.log("signup start effect",data)
                        if(data.success){
                        return new AUTH_ACTIONS.SignupSuccess(data);
                        }else{
                            return new AUTH_ACTIONS.SignupFailed(data.message);
                        }
                    })
                );
            })
        );
    })

    signUpSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AUTH_ACTIONS.SIGNUP_SUCCESS),
            map((action: AUTH_ACTIONS.SignupSuccess) => {
                console.log("signup success effect")
                this.spinner.hideSpinner();
                this.router.navigate(['/'])
            })
        );
    },{dispatch:false})
    

}