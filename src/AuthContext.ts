import { createContext } from "react"

export const anonymousUser = {
	name: "Anonimous",
}

export interface AuthInfo {
	user: {
		name: string
	}
}

export const AuthContext = createContext<AuthInfo>({ user: anonymousUser })
