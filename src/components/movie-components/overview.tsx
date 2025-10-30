import { useEffect, useState } from "react";
import { URL_REVIEW } from "../../shared/constants";
import type { OverviewTypes, Movies } from "../../shared/types";
import { useAuthTokenContext } from "./../../context/context";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, CardMedia, Typography, Button } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { IconButton } from "@mui/material";
import Header from "../header";

export default function Overview() {
	const { id } = useParams();
	const [overview, setOverview] = useState<OverviewTypes | null>(null);
	const navigate = useNavigate();
	const location = useLocation();
	const [isFavorite, setIsFavorite] = useState(false);
	const { token, userId } = useAuthTokenContext();

	function handleExitClick() {
		if (location.state?.from === "favorite") {
			navigate("/favorite");
		} else {
			navigate("/");
		}
	}

	useEffect(() => {
		if (!id) return;
		async function fetchingOverview() {
			const options = {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDE4NzQwMTQyNWE3NzRlNzk3M2M2YTFlNjQ1NmQ0NSIsIm5iZiI6MTc1OTcwNzgxNS45MDYsInN1YiI6IjY4ZTMwMmE3NzYwNDAwNTJhOWMyMjc2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8h-qKQP6Qdh4s8jo8-Wa9f9_Ahk5DmUsfl6EKAI0fwU`,
				},
			};
			const response = await fetch(`${URL_REVIEW}${id}?&language=ru-US`, options);
			const result = await response.json();
			setOverview(result);
		}

		async function checkFavorite() {
			if (!userId) return;
			const response = await fetch(`https://api.themoviedb.org/3/account/${userId}/favorite/movies?language=ru-US&sort_by=created_at.asc`, {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDE4NzQwMTQyNWE3NzRlNzk3M2M2YTFlNjQ1NmQ0NSIsIm5iZiI6MTc1OTcwNzgxNS45MDYsInN1YiI6IjY4ZTMwMmE3NzYwNDAwNTJhOWMyMjc2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8h-qKQP6Qdh4s8jo8-Wa9f9_Ahk5DmUsfl6EKAI0fwU`,
				},
			});
			try {
				const data = await response.json();
				const movies: Movies[] = data.results;
				setIsFavorite(movies.some((movie) => movie.id === Number(id)));
			} catch (error) {
				console.error(error);
			}
		}
		fetchingOverview();
		checkFavorite();
	}, [id, token, userId]);

	async function handelAddFavoriteClick(movieId: number) {
		const favoriteAction = !isFavorite;
		if (!userId) return;
		const response = await fetch(`https://api.themoviedb.org/3/account/${userId}/favorite`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDE4NzQwMTQyNWE3NzRlNzk3M2M2YTFlNjQ1NmQ0NSIsIm5iZiI6MTc1OTcwNzgxNS45MDYsInN1YiI6IjY4ZTMwMmE3NzYwNDAwNTJhOWMyMjc2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8h-qKQP6Qdh4s8jo8-Wa9f9_Ahk5DmUsfl6EKAI0fwU`,
			},
			body: JSON.stringify({
				media_type: "movie",
				media_id: movieId,
				favorite: favoriteAction,
			}),
		});
		try {
			const data = await response.json();
			console.log(data);
			setIsFavorite(favoriteAction);
		} catch (error) {
			console.error(error);
		}
	}

	if (!overview) {
		return;
	}
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
							{`${overview.title} (${overview.release_date.slice(0, 4)})`}
							<IconButton onClick={() => void handelAddFavoriteClick(overview.id)}>{!isFavorite ? <GradeOutlinedIcon /> : <StarOutlinedIcon />}</IconButton>
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
