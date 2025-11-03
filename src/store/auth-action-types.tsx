

export const SET_TOKEN ="SET_TOKEN"
export const SET_USERID = "SET_USERID"


export function setToken(token: string) {
	return { type: SET_TOKEN, token };
}

export function setUserId(userId: string) {
    return{type: SET_USERID, userId}
}
