import { withAuthenticationRequired } from "@auth0/auth0-react"
import { LinearProgress } from "@mui/material"

const AuthentificationGuard = ({
	component,
}: {
	component: React.ComponentType
}) => {
	const Component = withAuthenticationRequired(component, {
		onRedirecting: () => <LinearProgress />,
	})
	return <Component />
}

export default AuthentificationGuard
