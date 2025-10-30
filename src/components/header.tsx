import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<>
			<Box>
				<AppBar>
					<Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
						<Typography sx={{ fontSize: "20px" }}>Фильмы</Typography>
						<Box sx={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center" }}>
							<Link to={`/favorite`}>Избранное</Link>
							<Link to={`/login`}>
								<IconButton>
									<AccountCircle />
								</IconButton>
							</Link>
						</Box>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
}
