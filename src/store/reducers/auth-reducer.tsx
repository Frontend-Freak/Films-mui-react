import { SET_TOKEN, SET_USERID } from "../actions-type/auth-action-types";

export interface AuthState {
	token: string;
	userId: string;
}

export interface AuthAction {
	type: string;
	token?: string;
	userId?: string;
}

const initialState: AuthState = {
	token: localStorage.getItem("token") || "",
	userId: localStorage.getItem("userId") || "",
};

export function authReducer(state: AuthState = initialState, action: AuthAction) {
	switch (action.type) {
		case SET_TOKEN:
			if (action.token) localStorage.setItem("token", action.token);
			return { ...state, token: action.token || state.token };
		case SET_USERID:
			if (action.userId) localStorage.setItem("userId", action.userId);
			return { ...state, userId: action.userId || state.userId };
		default:
			return state;
	}
}
