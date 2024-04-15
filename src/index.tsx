import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "./index.scss"

import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import App from "./App"
import { ErrorBoundary } from "./ErrorBoundary"
import About from "./features/About/About"
import Home from "./features/Home/Home"
// import Movies from "./features/Movies/Movies"
import { LinearProgress } from "@mui/material"
import { Suspense, lazy } from "react"
import reportWebVitals from "./reportWebVitals"
import store from "./store"
import Extra from './features/Extra/Extra'

const Movies = lazy(() => import("./features/Movies/Movies"))

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Provider store={store}>
				<ErrorBoundary>
					<App />
				</ErrorBoundary>
			</Provider>
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
				// element: <Movies />,
				element: (
					<Suspense fallback={<LinearProgress sx={{ mt: 1 }} />}>
						<Movies />
					</Suspense>
				),
				// lazy: () => import("./features/Movies/Movies"),
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
