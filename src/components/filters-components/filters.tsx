import { Box, Typography, IconButton, TextField, FormControl, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import type { FiltersProps } from "../../shared/types";
import GenresList from "./filtering-by-genre";
import FilteringByYears from "./filtering-by-years";
import Sorting from "./sorting";

export default function Filters({ state, dispatch }: FiltersProps) {
	function handleResetFiltersClick() {
		dispatch({
			type: "RESET_FILTERS",
		});
	}

	function handlePageChange(_: React.ChangeEvent<unknown>, value: number) {
		dispatch({ 
			type: "SET_PAGE", change: value 
		});
	}

	function handleSearchFilmChange(e: React.ChangeEvent<HTMLInputElement>) {
		dispatch({ 
			type: "SET_SEARCH", change: e.target.value 
		});
	}
	return (
		<Paper
			sx={{
				display: "flex",
				gap: "30px",
				flexDirection: "column",
				padding: "16px",
				marginLeft: "8px",
				height: "fit-content",
				position: "sticky",
				top: "80px",
				alignSelf: "flex-start",
			}}
		>
			<Box sx={{ width: "300px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
				<Typography>Фильтры</Typography>
				<IconButton onClick={handleResetFiltersClick}>
					<CloseIcon />
				</IconButton>
			</Box>
			<FormControl
				fullWidth
				variant="standard"
			>
				<TextField
					label="Название фильма"
					placeholder="Введите название фильма"
					variant="standard"
					value={state.searchMovie}
					onChange={handleSearchFilmChange}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position="end">
									<IconButton>
										<SearchIcon />
									</IconButton>
								</InputAdornment>
							),
						},
					}}
				/>
			</FormControl>
			<Sorting
				state={state}
				dispatch={dispatch}
			/>
			<FilteringByYears
				state={state}
				dispatch={dispatch}
			/>
			<GenresList
				state={state}
				dispatch={dispatch}
			/>
			<Pagination
				count={state.totalPages}
				siblingCount={0}
				page={state.page}
				onChange={handlePageChange}
				color="primary"
			/>
		</Paper>
	);
}
