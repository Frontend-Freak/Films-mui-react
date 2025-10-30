import { AuthContext } from "./context";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

export function AuthTokenProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState(localStorage.getItem("token") || "");
	const [userId, setUserId] = useState(localStorage.getItem("id") || "");

	useEffect(() => {
		localStorage.setItem("token", token);
		localStorage.setItem("id", userId);
	}, [token, userId]);

	return <AuthContext.Provider value={{ token, setToken, userId, setUserId }}>{children}</AuthContext.Provider>;
}
