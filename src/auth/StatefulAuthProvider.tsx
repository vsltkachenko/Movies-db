import { AppState, Auth0Provider } from "@auth0/auth0-react"
import React from "react"
import { useNavigate } from "react-router-dom"
import configuration from "../configuration"

interface Props {
	children: React.ReactNode
}
const authConfig = {
	domain: configuration.auth0Domain!,
	clientId: configuration.auth0ClientId!,
	authorizationParams: {
		redirect_uri: configuration.auth0RedirectUri,
	},
}

const StatefulAuthProvider = ({ children }: Props) => {
	const navigate = useNavigate()

	const onRedirectCallback = (appState?: AppState) => {
		navigate(appState?.returnTo || window.location.pathname)
	}

	return (
		<Auth0Provider
			{...authConfig}
			cacheLocation="localstorage"
			onRedirectCallback={onRedirectCallback}
		>
			{children}
		</Auth0Provider>
	)
}

export default StatefulAuthProvider
