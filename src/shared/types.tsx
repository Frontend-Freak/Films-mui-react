export interface SortingTypes {
	value: string;
	label: string;
}

export interface Genres {
	id: number;
	name: string;
}

export interface Movies {
	id: number;
	title: string;
	original_title: string;
	overview: string;
	poster_path: string;
	release_date: string;
	vote_average: number;
	vote_count: number;
	popularity: number;
}

export type MovieAction = { type: "SET_TOTAL_PAGES"; change: number } | 
{ type: "SET_PAGE"; change: number } | 
{ type: "SET_SORTING"; change: SortingTypes } | 
{ type: "SET_GENRES"; change: Genres[] } | 
{ type: "SET_YEARS"; change: [number, number] } | 
{ type: "SET_SEARCH"; change: string }  | 
{ type: "SET_MOVIES"; change: Movies[] } | 
{ type: "SET_SEARCH_RESULT"; change: Movies[] }| 
{ type: "RESET_FILTERS" };

export type MovieState = {
	totalPages: number;
	page: number;
	sorting: SortingTypes;
	selectedGenres: Genres[];
	selectedYears: [number, number];
	searchMovie: string;
	movies: Movies[];
	searchResult: Movies[];
};

export interface FiltersProps {
	state: MovieState;
	dispatch: React.Dispatch<MovieAction>;
}

interface ProductionCountriesTypes {
	name: string;
}

interface ProductionCompanyTypes {
	id: string;
	logo_path: string;
	name: string;
}

export interface OverviewTypes {
	poster_path: string;
	title: string;
	original_title: string;
	overview: string;
	release_date: string;
	genres: Genres[];
	origin_country: string[];
	production_countries: ProductionCountriesTypes[];
	runtime: number;
	vote_average: number;
	production_companies: ProductionCompanyTypes[];
	id: number;
}

export interface AuthTokenContextType {
	token: string;
	setToken: (token: string) => void;
	userId: string;
	setUserId: (id: string) => void;
}
