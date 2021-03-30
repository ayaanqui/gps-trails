import { Action, createReducer, on } from "@ngrx/store";
import { login, logout } from '../actions/auth.action';

export interface AuthStatus {
    loggedIn?: boolean;
    accessToken?: string;
    user?: {id: number, email: string, name: string};
}

export const status: AuthStatus = {
    loggedIn: false,
    accessToken: undefined,
    user: undefined,
};

const _authSetLoggedInReducer = createReducer(
    status,
    on(login, state => {
        const accessToken: string | null = localStorage.getItem('access_token');
        const userStr: string | null = localStorage.getItem('user');
        const user: {id: number, name: string, email: string} = userStr != null ? JSON.parse(userStr) : null;

        const authStatus: AuthStatus = {
            loggedIn: true,
            accessToken: accessToken ? accessToken : '',
            user: user
        };
        return authStatus;
    }),
    on(logout, state => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        return {
            loggedIn: false,
            accessToken: undefined,
            user: undefined
        };
    })
);

export const authReducer = (state: AuthStatus | undefined, action: Action) => {
    return _authSetLoggedInReducer(state, action);
};