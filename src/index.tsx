import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "./index.scss"

import { LinearProgress } from "@mui/material"
import { Suspense, lazy } from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import App from "./App"
import { ErrorBoundary } from "./ErrorBoundary"
import AuthCallback from "./auth/AuthCallback"
import AuthentificationGuard from "./auth/AuthentificationGuard"
import StatefulAuthProvider from "./auth/StatefulAuthProvider"
import About from "./features/About/About"
import Extra from "./features/Extra/Extra"
import Home from "./features/Home/Home"
import Profile from "./features/Profile/Profile"
import reportWebVitals from "./reportWebVitals"
import store from "./store"

const Movies = lazy(() => import("./features/Movies/Movies"))

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<StatefulAuthProvider>
				<Provider store={store}>
					<ErrorBoundary>
						<App />
					</ErrorBoundary>
				</Provider>
			</StatefulAuthProvider>
		),
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/extra",
				element: <Extra />,
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/movies",
				element: (
					<Suspense fallback={<LinearProgress sx={{ mt: 1 }} />}>
						<Movies />
					</Suspense>
				),
				// lazy: () => import("./features/Movies/Movies"),
			},
			{
				path: "/callback",
				element: <AuthCallback />,
			},
			{
				path: "/profile",
				element: <AuthentificationGuard component={Profile} />,
			},
		],
	},
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<>
		<RouterProvider router={router} />
	</>
)

reportWebVitals()
