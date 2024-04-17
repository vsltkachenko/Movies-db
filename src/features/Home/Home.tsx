import { useAuth0 } from "@auth0/auth0-react"
import { Box, Button, Container, Stack, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const Home = () => {
	const { user, isAuthenticated } = useAuth0()

	const greeting = isAuthenticated
		? `${user?.name}, explore movies today whith us!`
		: "Explore movies today whith us!"

	// throw new Error("Fatality!")

	return (
		<>
			<Box sx={{ pt: 8, pb: 8 }}>
				<Container maxWidth="sm">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="text.primary"
						gutterBottom
					>
						Welcome
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="text.secondary"
						paragraph
					>
						{greeting}
					</Typography>
					<Stack
						sx={{ pt: 4 }}
						direction="row"
						spacing={2}
						justifyContent="center"
					>
						<Button
							component={RouterLink}
							to="/movies"
							variant="contained"
							color="secondary"
						>
							Explore
						</Button>
					</Stack>
				</Container>
			</Box>
			<Copyright />
		</>
	)
}

function Copyright() {
	return (
		<Typography
			variant="body2"
			paddingTop={4}
			color="text.secondary"
			align="center"
			borderTop={1}
			borderColor={"#c4c4c4"}
		>
			Copyright © The Movies DB {new Date().getFullYear()}
		</Typography>
	)
}

export default Home
