import { useEffect, useState } from "react";
import { URL_REVIEW } from "../../shared/constants";
import type { Movies, OverviewTypes } from "../../shared/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, CardMedia, Typography, Button } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { IconButton } from "@mui/material";
import Header from "../header";
import { useReducer } from "react";
import { movieReducer } from "../../shared/reducer";
import { initialState } from "../../shared/constants";
import { URL_FAVORITE, URL_CHECK_FAVORITE } from "../../shared/constants";
import { useSelector } from "react-redux";
import type { AuthState } from "../../store/reducers/auth-reducer";

export default function Overview() {
	const { id } = useParams();
	const [overview, setOverview] = useState<OverviewTypes | null>(null);
	const navigate = useNavigate();
	const location = useLocation();
	const token = useSelector((state: AuthState) => state.token);
	const userId = useSelector((state: AuthState) => state.userId);
	const [state, dispatch] = useReducer(movieReducer, initialState);

	console.log(state.isFavorite);
	console.log(token)

	function handleExitClick() {
		if (location.state?.from === "favorite") {
			navigate("/favorite");
		} else {
			navigate("/");
		}
	}

	useEffect(() => {
		if (!id) return;
		async function loadOverview() {
			const url = `${URL_REVIEW}${id}?&language=ru-US`;
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
				setOverview(result.results);
			} catch (error) {
				console.error(error);
			}
			console.log(url)
		}

		async function checkFavorite() {
			if (!userId) return;
			const url = URL_FAVORITE(userId);
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
				const isFavorite = result.results.some((movie: Movies) => movie.id === Number(id));
				dispatch({ type: "CHECK_FAVORITE", change: isFavorite });
			} catch (error) {
				console.error(error);
			}
		}
		loadOverview();
		checkFavorite();
	}, [id, token, userId, dispatch]);

	async function handelAddFavoriteClick(movieId: number) {
		const favoriteAction = !state.isFavorite;
		if (!userId) return;
		const url = URL_CHECK_FAVORITE(userId);
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				media_type: "movie",
				media_id: movieId,
				favorite: favoriteAction,
			}),
		};
		try {
			const response = await fetch(url, options);
			if (!response.ok) return;
			dispatch({ type: "CHECK_FAVORITE", change: favoriteAction });
		} catch (error) {
			console.error(error);
		}
	}

	if (!overview) {
		return;
	}

	const releaseYear = overview.release_date.slice(0, 4);
	return (
		<Box>
			<Header />
			<Card sx={{ width: "90vw", display: "flex", margin: "70px auto", padding: "20px" }}>
				{overview.poster_path ? (
					<CardMedia
						component="img"
						sx={{ width: "350px", height: "525px", objectFit: "contain" }}
						image={`https://image.tmdb.org/t/p/w500${overview.poster_path}`}
					/>
				) : (
					<Box sx={{ width: "350px", height: "525px", display: "flex", alignItems: "center", justifyContent: "center" }}>
						<Typography>Изображение отсутсвует</Typography>
					</Box>
				)}

				<CardContent>
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Typography sx={{ fontSize: "25px", fontWeight: "600" }}>
							{`${overview.title} (${releaseYear})`}
							<IconButton onClick={() => void handelAddFavoriteClick(overview.id)}>{!state.isFavorite ? <GradeOutlinedIcon /> : <StarOutlinedIcon />}</IconButton>
						</Typography>
						<Button onClick={handleExitClick}>Назад</Button>
					</Box>
					<Box>
						<Typography sx={{ fontSize: "20px", margin: "20px 0" }}>О фильме</Typography>
						<Typography>Оригинальное название: {overview.original_title}</Typography>
						<Typography>Страна производства: {overview.production_countries.map((country) => country.name)}</Typography>
						<Typography>Дата производства: {overview.release_date}</Typography>
						<Typography>Жанры: {overview.genres.map((genre) => genre.name).join(", ")}</Typography>
						<Typography>Время: {overview.runtime}</Typography>
						<Typography>Рейтинг: {overview.vote_average}</Typography>
					</Box>
					<Typography sx={{ fontSize: "20px", fontWeight: "500", margin: "20px 0" }}>Описание:</Typography>
					{overview.overview ? <Typography>{overview.overview}</Typography> : <Typography>Описание отсутсвует</Typography>}
				</CardContent>
			</Card>
		</Box>
	);
}
