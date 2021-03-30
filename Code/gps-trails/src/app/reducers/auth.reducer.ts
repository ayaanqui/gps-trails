import { Action, createReducer, on } from "@ngrx/store";
import { login, logout } from '../actions/auth.action';

export const loggedIn: boolean = false;

const _authSetLoggedInReducer = createReducer(
    loggedIn,
    on(login, state => {
        const accessToken: string | null = localStorage.getItem('access_token');
        const userStr: string | null = localStorage.getItem('user');
        const user: {id: number, name: string, email: string} = userStr != null ? JSON.parse(userStr) : null;
        console.log('From state management: ', user);
        return true;
    }),
    on(logout, state => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        return false;
    })
);

export const authReducer = (state: boolean | undefined, action: Action) => {
    return _authSetLoggedInReducer(state, action);
};