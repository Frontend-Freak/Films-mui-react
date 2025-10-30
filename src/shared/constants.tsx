import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import type { MovieState } from "./types";

export const URL_GENRES = "https://api.themoviedb.org/3/genre/movie/list?language=ru";
export const URL_FILMS = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ru-US";
export const URL_REVIEW = "https://api.themoviedb.org/3/movie/";
//export const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDE4NzQwMTQyNWE3NzRlNzk3M2M2YTFlNjQ1NmQ0NSIsIm5iZiI6MTc1OTcwNzgxNS45MDYsInN1YiI6IjY4ZTMwMmE3NzYwNDAwNTJhOWMyMjc2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8h-qKQP6Qdh4s8jo8-Wa9f9_Ahk5DmUsfl6EKAI0fwU";

export const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
export const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const sortOptions = [
	{ value: "popularity.desc", label: "По популярности ↓" },
	{ value: "vote_average.desc", label: "По рейтингу ↓" },
	{ value: "release_date.desc", label: "По дате ↓" },
	{ value: "popularity.asc", label: "По популярности ↑" },
	{ value: "vote_average.asc", label: "По рейтингу ↑" },
	{ value: "release_date.asc", label: "По дате ↑" },
];

export const DEFAULT_STRING_VALUE = "";

export const initialState: MovieState = {
	totalPages: 1,
	page: 1,
	sorting: sortOptions[0],
	selectedGenres: [],
	selectedYears: [2000, 2025],
	searchMovie: "",
	movies: [],
	searchResult: [],
};
