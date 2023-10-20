import { createFeatureSelector,createSelector } from '@ngrx/store';
import { AuthState } from '../states/auth.state';

export const AUTH_STATE_NAME = 'auth';
export const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const getUser = createSelector(getAuthState, (state:AuthState) => {
    return state;
});
