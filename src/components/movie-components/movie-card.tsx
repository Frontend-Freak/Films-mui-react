import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL_FILMS } from "../../shared/constants";
import type { Movies } from "../../shared/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import type { FiltersProps } from "../../shared/types";
import { URL_SEARCH_MOVIE } from "../../shared/constants";
import { useSelector } from "react-redux";
import type { AuthState } from "../../store/reducers/auth-reducer";

export default function MovieCard({ state, dispatch }: FiltersProps) {
	const [searchResult, setSearchResult] = useState<Movies[]>([]);

	const yearsFrom = state.selectedYears[0];
	const yearsTo = state.selectedYears[1];
	const genre = state.selectedGenres.map((genre) => genre.id).join(",");

	const token = useSelector((state: AuthState) => state.token);

	console.log(token);

	useEffect(() => {
		async function setMovies() {
			const url = `${URL_FILMS}&page=${state.page}&sort_by=${state.sorting.value}&primary_release_date.gte=${yearsFrom}-01-01&primary_release_date.lte=${yearsTo}-12-31&with_genres=${genre}`;
			const options = {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			try {
				const response = await fetch(url, options);
				const result = await response.json();
				console.log(result.results);
				console.log(result.total_pages);
				dispatch({ type: "SET_MOVIES", change: result.results });
				dispatch({ type: "SET_TOTAL_PAGES", change: result.total_pages });
			} catch (error) {
				console.error(error);
			}
		}
		setMovies();
	}, [state.page, state.sorting, token, dispatch, genre, yearsFrom, yearsTo]);

	useEffect(() => {
		if (!token || !state.searchMovie.trim()) return;
		async function setSearchMovie() {
			const options = {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			try {
				const response = await fetch(URL_SEARCH_MOVIE(state.searchMovie), options);
				const result = await response.json();
				setSearchResult(result.results);
				console.log(result.results);
			} catch (error) {
				console.error(error);
			}
		}
		setSearchMovie();
	}, [token, state.searchMovie]);

	const showMovies = state.searchMovie.trim() ? searchResult : state.movies;


	

	return (
		<Box sx={{ display: "flex", width: "100%", gap: "25px", margin: "0 auto", flexWrap: "wrap" }}>
			{showMovies && showMovies.length > 0 ? (
				showMovies.map((movie) => (
					<Card
						key={movie.id}
						sx={{ width: "250px", height: "500px" }}
					>
						<Link
							to={`/movie/${movie.id}`}
							state={{ from: "home" }}
						>
							{movie.poster_path ? (
								<CardMedia
									component="img"
									sx={{ height: "380px", objectFit: "contain" }}
									image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								/>
							) : (
								<Box sx={{ height: "380px", display: "flex", alignItems: "center", justifyContent: "center" }}>
									<Typography>Изображение отсутсвует</Typography>
								</Box>
							)}
							<CardContent>
								<Typography sx={{ fontSize: "16px", fontWeight: "600" }}>{`${movie.title}${movie.release_date ? ` (${movie.release_date.slice(0, 4)})` : ""}`}</Typography>
								<Box>
									<Typography>{`Рейтинг: ${movie.vote_average}(${movie.vote_count})`}</Typography>
								</Box>
							</CardContent>
						</Link>
					</Card>
				))
			) : state.searchMovie.trim() ? (
				<Box sx={{ margin: "auto 20vw", maxWidth: "400px", textAlign: "center" }}>
					<Typography variant="h3">Фильмы не найдены</Typography>
				</Box>
			) : (
				<Box sx={{ margin: "auto 20vw", maxWidth: "400px", textAlign: "center" }}>
					<Typography variant="h3">Войдите в учетную запись</Typography>
					<Link to={`/login`}>
						<Button sx={{ marginTop: "20px" }}>Войти</Button>
					</Link>
				</Box>
			)}
		</Box>
	);
}
