import PauseIcon from "@mui/icons-material/Pause"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { Card, CardActions, CardMedia, IconButton } from "@mui/material"
import { useRef, useState } from "react"

const CountdownVideo = () => {
	const [isPlaying, setIsPlaing] = useState(false)

	const videoRef = useRef<HTMLVideoElement>(null)

	const togglePlaying = () => {
		if (isPlaying) {
			videoRef.current?.pause()
		} else {
			videoRef.current?.play()
		}
	}

	return (
		<Card>
			<CardMedia>
				<video
					ref={videoRef}
					src="https://www.pexels.com/download/video/3843433"
					height={"500"}
					onPlay={() => setIsPlaing(true)}
					onPause={() => setIsPlaing(false)}
				></video>
			</CardMedia>
			<CardActions>
				<IconButton onClick={togglePlaying}>
					{isPlaying ? (
						<PauseIcon sx={{ height: 38, width: 38 }} />
					) : (
						<PlayArrowIcon sx={{ height: 38, width: 38 }} />
					)}
				</IconButton>
			</CardActions>
		</Card>
	)
}

export default CountdownVideo
