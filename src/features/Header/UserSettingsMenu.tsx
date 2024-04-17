import {
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from "@mui/material"
import { useState } from "react"

interface Props {
	user: any
	onOpenProfile: () => void
	onLogout: () => void
}

const UserSettingsMenu = ({ user, onOpenProfile, onLogout }: Props) => {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
	
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElUser(event.currentTarget)
	}
	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}
	return (
		<Box sx={{ flexGrow: 0 }}>
			<Tooltip title="Open settings">
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar alt={user?.name} src={user?.picture} />
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ mt: "45px" }}
				anchorEl={anchorElUser}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				<MenuItem
					onClick={() => {
						handleCloseUserMenu()
						onOpenProfile()
					}}
				>
					<Typography textAlign="center">Profile</Typography>
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleCloseUserMenu()
						onLogout()
					}}
				>
					<Typography textAlign="center">Logout</Typography>
				</MenuItem>
			</Menu>
		</Box>
	)
}

export default UserSettingsMenu
