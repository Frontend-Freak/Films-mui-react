import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL_FILMS } from "../../shared/constants";
import type { Movies } from "../../shared/types";
import { useAuthTokenContext } from "./../../context/context";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import type { FiltersProps } from "../../shared/types";

export default function MovieCard({ state, dispatch }: FiltersProps) {
	const [searchResult, setSearchResult] = useState<Movies[]>([]);

	const yearsFrom = state.selectedYears[0];
	const yearsTo = state.selectedYears[1];
	const genre = state.selectedGenres.map((genre) => genre.id).join(",");

	const { token } = useAuthTokenContext();

	useEffect(() => {
		async function fetchingMovies() {
			const url = `${URL_FILMS}&page=${state.page}&sort_by=${state.sorting.value}&primary_release_date.gte=${yearsFrom}-01-01&primary_release_date.lte=${yearsTo}-12-31&with_genres=${genre}`;
			const options = {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const response = await fetch(url, options);
			const result = await response.json();
			dispatch({ type: "SET_MOVIES", change: result.results });
			dispatch({ type: "SET_TOTAL_PAGES", change: result.total_pages });
			console.log(url, state.page);
		}
		fetchingMovies();
	}, [state.page, state.sorting, token, dispatch, genre, yearsFrom, yearsTo]);

	useEffect(() => {
		if (!token || !state.searchMovie.trim()) return;
		async function fetchingSearch() {
			const options = {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			try {
				const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${state.searchMovie}&language=ru-RU&page=1`, options);
				const result = await response.json();
				setSearchResult(result.results);
			} catch (error) {
				console.error(error);
			}
		}
		fetchingSearch();
	}, [token, state.searchMovie]);

	console.log(searchResult, state.movies);

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
