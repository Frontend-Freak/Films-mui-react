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
	token: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDE4NzQwMTQyNWE3NzRlNzk3M2M2YTFlNjQ1NmQ0NSIsIm5iZiI6MTc1OTcwNzgxNS45MDYsInN1YiI6IjY4ZTMwMmE3NzYwNDAwNTJhOWMyMjc2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8h-qKQP6Qdh4s8jo8-Wa9f9_Ahk5DmUsfl6EKAI0fwU",
	userId: "22362750",
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
