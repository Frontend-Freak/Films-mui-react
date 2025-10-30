import type { MovieState, MovieAction } from "../shared/types";

export function movieReducer(state: MovieState, action: MovieAction): MovieState {
	switch (action.type) {
		case "SET_TOTAL_PAGES":
			return { ...state, totalPages: action.change };
		case "SET_PAGE":
			return { ...state, page: action.change };
		case "SET_SORTING":
			return { ...state, sorting: action.change };
		case "SET_GENRES":
			return { ...state, selectedGenres: action.change };
		case "SET_YEARS":
			return { ...state, selectedYears: action.change };
		case "SET_SEARCH":
			return { ...state, searchMovie: action.change };
		case "SET_MOVIES":
			return { ...state, movies: action.change };
		case "SET_SEARCH_RESULT":
			return { ...state, searchResult: action.change };
		case "RESET_FILTERS":
			return { ...state, page: 1, sorting: { value: "popularity.desc", label: "По популярности ↓" }, selectedGenres: [], selectedYears: [2000, 2025], searchMovie: "" };
		default:
			return state;
	}
}