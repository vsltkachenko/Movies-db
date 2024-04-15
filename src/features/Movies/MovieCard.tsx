import { Favorite } from "@mui/icons-material"
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Tooltip,
	Typography,
} from "@mui/material"
import { memo } from "react"
import { Link as RouterLink } from "react-router-dom"

interface MovieCardProps {
	id: number
	title: string
	overview: string
	popularity: number
	enableUserActions?: boolean
	image?: string
	onAddFavorite?: (id: number) => void
}

const MovieCard = ({
	id,
	title,
	overview,
	popularity,
	enableUserActions,
	image = "./movie-thumbnail.jpg",
	onAddFavorite,
}: MovieCardProps) => {

	return (
		<Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
			<CardMedia component="div" image={image} sx={{ pt: "56.25%" }} />
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography variant="h5">{title}</Typography>
				<Typography variant="body2" color="text.secondary">
					{overview}
				</Typography>
				<Typography variant="button" display="block" mt={2}>
					{popularity}
				</Typography>
			</CardContent>
			<CardActions>
				<Button component={RouterLink} to={`/movies/${id}`} color="secondary">
					Details
				</Button>
				{enableUserActions && (
					<Tooltip title="Add to favorites">
						<IconButton onClick={() => onAddFavorite?.(id)}>
							<Favorite />
						</IconButton>
					</Tooltip>
				)}
			</CardActions>
		</Card>
	)
}

export default memo(MovieCard)
