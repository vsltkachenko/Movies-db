import { Typography } from "@mui/material"
import { useEffect, useRef, useState } from "react"

const CountdownText = () => {
	const [countdown, setCountdown] = useState(9)
	const intervalRef = useRef<any>()

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setCountdown(value => value - 1)
		}, 1000)
		return () => clearInterval(intervalRef.current)
	}, [])

	useEffect(() => {
		if (countdown === 0) {
			clearInterval(intervalRef.current)
		}
	}, [countdown])

	return (
		<Typography variant="h5" align="center">
			Coming soon: {countdown}
		</Typography>
	)
}

export default CountdownText
