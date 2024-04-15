import SkipNextIcon from "@mui/icons-material/SkipNext"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import { Box, Button } from "@mui/material"
import { FC } from "react"

type Props = {
	current: number
	onNext: () => void
	onPrev: () => void
	isNextPage: boolean
}

const Pager: FC<Props> = ({ current, onNext, onPrev, isNextPage }) => {
	return (
		<Box
			sx={{ display: "inline-flex", alignItems: "center", gap: "10px", pb: 2 }}
		>
			<Button
				startIcon={<SkipPreviousIcon />}
				disabled={current === 1}
				variant="contained"
				onClick={onPrev}
			>
				Previous
			</Button>
			<Button variant="outlined" disabled>
				{current}
			</Button>
			<Button
				endIcon={<SkipNextIcon />}
				disabled={!isNextPage}
				variant="contained"
				onClick={onNext}
			>
				Next
			</Button>
		</Box>
	)
}

export default Pager
