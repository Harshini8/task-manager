import { UserLoginStatusDetails } from "src/models/user.model";

export interface AuthState{
    user: UserLoginStatusDetails | {"success":boolean,"message":string};
}

export const initialAuthState: AuthState = {
    user: {"success":false,"message":""},  
};