import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { FC } from "react"
import { Character } from "../../services/rickandmorty"

type Props = {
	name: string
	episode: string
	airDate: string
	characters: Character[]
}

const EpisodeCard: FC<Props> = ({ name, episode, airDate, characters }) => {
	return (
		<Card sx={{ display: "flex", flexDirection: "column", height: "80vh" }}>
			<CardContent
				sx={{ display: "flex", flexDirection: "column", height: "100%" }}
			>
				<Box>
					<Typography variant="h5">{name}</Typography>
					<Typography variant="body2" color="text.secondary">
						{episode}
					</Typography>
					<Typography variant="body2" display="block">
						{airDate}
					</Typography>
				</Box>
				<Typography variant="h6" sx={{ fontWeight: "bold" }} my={2}>
					Characters
				</Typography>
				<Box overflow="auto">
					{characters.map(({ name, image }) => (
						<Box
							sx={{
								display: "flex",
								gap: "15px",
								alignItems: "center",
								marginBottom: "10px",
							}}
						>
							<CardMedia
								component="div"
								image={image}
								sx={{ width: "50px", borderRadius: "50%", height: "50px" }}
							/>
							<Typography variant="body1">{name}</Typography>
						</Box>
					))}
				</Box>
			</CardContent>
		</Card>
	)
}

export default EpisodeCard
