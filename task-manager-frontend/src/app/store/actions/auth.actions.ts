import { UserLoginDetails, UserLoginStatusDetails } from 'src/models/user.model';
import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILED = '[Auth] Login Failed';
export const SIGNUP_START = '[Auth] Signup Start';
export const SIGNUP_SUCCESS = '[Auth] Signup Success';
export const SIGNUP_FAILED = '[Auth] Signup Failed';



export class LoginStart implements Action{
    readonly type = LOGIN_START;
    constructor(public loginDetails:UserLoginDetails){
        console.log("login start action",loginDetails)
    }
}

export class LoginSuccess implements Action{
    readonly type = LOGIN_SUCCESS;
    constructor(public loginDetails:UserLoginStatusDetails){
        console.log("login success action",loginDetails)
    }
}

export class LoginFailed implements Action{
    readonly type = LOGIN_FAILED;
    constructor(public error:string){}
}

export class SignupStart implements Action{
    readonly type = SIGNUP_START;
    constructor(public signupDetails:UserLoginDetails){}
}

export class SignupSuccess implements Action{
    readonly type = SIGNUP_SUCCESS;
    constructor(public signupDetails:UserLoginStatusDetails){}
}

export class SignupFailed implements Action{
    readonly type = SIGNUP_FAILED;
    constructor(public error:string){}
}