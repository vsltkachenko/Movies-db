import { LiveTvOutlined } from "@mui/icons-material"
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material"
import { useContext } from "react"
import { Link as RouterLink } from "react-router-dom"
import { AuthContext, anonymousUser } from "./AuthContext"

const HeaderLink = ({
	children,
	to,
}: {
	children: React.ReactNode
	to: string
}) => {
	return (
		<Link
			component={RouterLink}
			variant="button"
			color="inherit"
			sx={{ my: 1, mx: 1.5 }}
			to={to}
		>
			{children}
		</Link>
	)
}

interface AuthHeaderProps {
	onLogin: () => void
	onLogout: () => void
}
const AppHeader = ({ onLogin, onLogout }: AuthHeaderProps) => {
	return (
		<AppBar position="static">
			<Toolbar>
				<LiveTvOutlined sx={{ mr: 2 }} />
				<Typography variant="h6" color="inherit" noWrap>
					The movies DB
				</Typography>
				<Box sx={{ flexGrow: 1, ml: 4 }}>
					<nav>
						<HeaderLink to={"/"}>Home</HeaderLink>
						<HeaderLink to={"/movies"}>Movies</HeaderLink>
						<HeaderLink to={"/about"}>About</HeaderLink>
					</nav>
				</Box>
				<AuthSection onLogin={onLogin} onLogout={onLogout} />
			</Toolbar>
		</AppBar>
	)
}

interface AuthSectionProps {
	onLogin: () => void
	onLogout: () => void
}
function AuthSection({ onLogin, onLogout }: AuthSectionProps) {
	const { user } = useContext(AuthContext)
	const loggedIn = user !== anonymousUser

	if (loggedIn) {
		return (
			<>
				<Typography>Hello, {user.name}!</Typography>
				<Button
					color="inherit"
					variant="outlined"
					sx={{ ml: 2 }}
					onClick={onLogout}
				>
					Log out
				</Button>
			</>
		)
	}

	return (
		<Button color="inherit" variant="outlined" onClick={onLogin}>
			Log in
		</Button>
	)
}

export default AppHeader
