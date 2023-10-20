export interface UserLoginDetails{
    email:string;
    password:string;
}

export interface UserLoginStatusDetails{
    username?:string;
    token?:string;
    id?:string;
    success:boolean;
    message:string;
}

export interface UserRegisterDetails{
    username:string;
    email:string;
    password:string;
}