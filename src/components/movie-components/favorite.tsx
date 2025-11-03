import { Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useReducer } from "react";
import Header from "../header";
import { URL_FAVORITE, initialState, getOptions } from "../../shared/constants";
import { fetchingApi } from "../../api";
import { movieReducer } from "../../shared/reducer";
import { useSelector } from "react-redux";
import type { AuthState } from "../../store/auth-reducer";

export default function FavoritePage() {
	const navigate = useNavigate();
	const location = useLocation();

	const token = useSelector((state: AuthState) => state.token);
	const userId = useSelector((state: AuthState) => state.userId);
	const [state, dispatch] = useReducer(movieReducer, initialState);

	useEffect(() => {
		if (!userId) return;
		async function loadFavorite() {
			const url = URL_FAVORITE(userId);
			try {
				const dataFavorite = await fetchingApi({ url: url, options: getOptions(token) });
				dispatch({ type: "LOAD_FAVORITE", change: dataFavorite.results });
			} catch (error) {
				console.error(error);
			}
		}
		loadFavorite();
	}, [token, userId, dispatch]);

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

				{state.favorite && state.favorite.length > 0 ? (
					<Box sx={{ display: "flex", gap: "25px", flexWrap: "wrap", padding: "20px" }}>
						{state.favorite.map((movie) => (
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
