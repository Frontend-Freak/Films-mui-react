import { SET_TOKEN, SET_USERID } from "../actions-type/auth-action-types";

export function setToken(token: string) {
	return { type: SET_TOKEN, token };
}

export function setUserId(userId: string) {
    return{type: SET_USERID, userId}
}