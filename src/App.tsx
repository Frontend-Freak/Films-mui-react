import Header from "./components/header";
import { Box } from "@mui/material";
import MoviePage from "./components/movie-components/movies-page";

export default function App() {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: "80px", position: "relative" }}>
			<Header />
			<MoviePage />
		</Box>
	);
}
