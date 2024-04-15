import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import React from "react"
import { teal } from "@mui/material/colors"

const defaultTheme = createTheme({
	palette: {
		primary: teal,
		secondary: { main: "#96000f" },
	},
})

const MyThemeProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}

export default MyThemeProvider
