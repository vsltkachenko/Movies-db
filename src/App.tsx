import { Outlet } from "react-router-dom"
import AppHeader from "./features/Header/AppHeader"
import MyThemeProvider from "./MyThemeProvider"

function App() {
	return (
		<MyThemeProvider>
			<AppHeader />
			<main>
				<Outlet />
			</main>
		</MyThemeProvider>
	)
}

export default App
