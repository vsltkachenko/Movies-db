import { useState } from "react"
import { Outlet } from "react-router-dom"
import AppHeader from "./AppHeader"
import { AuthContext, AuthInfo, anonymousUser } from "./AuthContext"
import MyThemeProvider from "./MyThemeProvider"

const fakeAuth = { user: { name: "Diana" } }

function App() {
	const [auth, setAuth] = useState<AuthInfo>({ user: anonymousUser })

	return (
		<MyThemeProvider>
			<AuthContext.Provider value={auth}>
				<AppHeader
					onLogin={() => setAuth(fakeAuth)}
					onLogout={() => setAuth({ user: anonymousUser })}
				/>
				<main>
					<Outlet />
				</main>
			</AuthContext.Provider>
		</MyThemeProvider>
	)
}

export default App
