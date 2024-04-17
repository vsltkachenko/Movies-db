import { LiveTvOutlined } from "@mui/icons-material"
import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthSection } from "./AuthSection"

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

const AppHeader = () => {
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
						<HeaderLink to={"/extra"}>Extra</HeaderLink>
					</nav>
				</Box>
				<AuthSection />
			</Toolbar>
		</AppBar>
	)
}

export default AppHeader
