import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthTokenContext } from "./../../context/context";
import type { Movies } from "../../shared/types";
import Header from "../header";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

export default function FavoritePage() {
	const [favoriteMovies, setFavoriteMovies] = useState<Movies[]>([]);
	const navigate = useNavigate();
	const location = useLocation();

	const { token, userId } = useAuthTokenContext();
	useEffect(() => {
		async function fetchingFavorite() {
			const url = `https://api.themoviedb.org/3/account/${userId}/favorite/movies?language=ru-US`;
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
				setFavoriteMovies(result.results);
			} catch (error) {
				console.error(error);
			}
		}
		fetchingFavorite();
	}, [token, userId]);

	function handleExitClick() {
		if (location.state?.from === "favorite") {
			navigate("/favorite");
		} else {
			navigate("/");
		}
	}

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: "70px" }}>
			<Header />

			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<Button
					sx={{ alignSelf: "flex-end", marginRight: "25px" }}
					onClick={handleExitClick}
				>
					Назад
				</Button>

				{favoriteMovies && favoriteMovies.length > 0 ? (
					<Box sx={{ display: "flex", gap: "25px", flexWrap: "wrap", padding: "20px" }}>
						{favoriteMovies.map((movie) => (
							<Card
								key={movie.id}
								sx={{ width: "250px", height: "500px" }}
							>
								<Link
									to={`/movie/${movie.id}`}
									state={{ from: "favorite" }}
								>
									<CardMedia
										component="img"
										sx={{ height: "380px", objectFit: "contain" }}
										image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									/>
									<CardContent>
										<Typography sx={{ fontSize: "16px", fontWeight: "600" }}>{`${movie.title}${movie.release_date ? ` (${movie.release_date.slice(0, 4)})` : ""}`}</Typography>
										<Box>
											<Typography>{`Рейтинг: ${movie.vote_average}(${movie.vote_count})`}</Typography>
										</Box>
									</CardContent>
								</Link>
							</Card>
						))}
					</Box>
				) : (
					<Box sx={{ display: "flex", margin: "25vh auto", flexDirection: "column", alignItems: "center", gap: "20px" }}>
						<Typography variant="h3">Список избранных пуст</Typography>
						<Link to={`/`}>
							<Button>К фильмам</Button>
						</Link>
					</Box>
				)}
			</Box>
		</Box>
	);
}
