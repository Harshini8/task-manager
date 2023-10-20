import { AuthState } from '../states/auth.state';
import * as AUTH_ACTIONS from '../actions/auth.actions';


export function AuthReducer(state: AuthState, action:any): AuthState {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_SUCCESS:
            console.log('login success reducer', action,state);
            return {
                ...state,
                user: action.loginDetails
            };
        case AUTH_ACTIONS.LOGIN_FAILED:
            console.log('login fail reducer', action);
            let loginDetails ={
                "success":false,
                "message":action.error
            }
            return {
                ...state,
                user: loginDetails
            };
        default:
            return state;
    }
}
