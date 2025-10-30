import { Box } from "@mui/material";
import { useReducer } from "react";
import { movieReducer } from "../../shared/reducer";
import { initialState } from "../../shared/constants";
import Filters from "../filters-components/filters";
import MovieCard from "./movie-card";

export default function MoviePage() {
	const [state, dispatch] = useReducer(movieReducer, initialState);

	return (
		<Box sx={{ display: "flex", gap: "20px", position: "relative", marginBottom:"20px" }}>
			<Filters
				state={state}
				dispatch={dispatch}
			/>
			<MovieCard
				state={state}
				dispatch={dispatch}
			/>
		</Box>
	);
}
