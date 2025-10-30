import { createContext, useContext } from "react";
import type { AuthTokenContextType } from "../shared/types";

export const AuthContext = createContext<AuthTokenContextType | null>(null);

export function useAuthTokenContext() {
	const context = useContext(AuthContext);
	if (!context) throw new Error("error");
	return context;
}
