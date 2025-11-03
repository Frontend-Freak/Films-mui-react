import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { URL_GENRES, icon, checkedIcon } from "../../shared/constants";
import type { FiltersProps, Genres } from "../../shared/types";
import { useSelector } from "react-redux";
import type { AuthState } from "../../store/reducers/auth-reducer";

export default function GenresList({ state, dispatch }: FiltersProps) {
	const [genres, setGenres] = useState<Genres[]>([]);

	const token = useSelector((state: AuthState) => state.token);

	useEffect(() => {
		async function loadGenres() {
			const options = {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			try {
				const response = await fetch(URL_GENRES, options);
				const result = await response.json();
				console.log(result);
				setGenres(result.genres);
			} catch (error) {
				console.error(error);
			}
		}
		loadGenres();
	}, [token]);

	function handleSelectedGenresChange(_: React.SyntheticEvent, newValue: Genres[]) {
		dispatch({
			type: "SET_GENRES",
			change: newValue,
		});
	}

	return (
		<Autocomplete
			multiple
			limitTags={1}
			options={genres}
			value={state.selectedGenres}
			onChange={handleSelectedGenresChange}
			disableCloseOnSelect
			getOptionLabel={(genre) => genre.name}
			renderOption={(props, genre, { selected }) => {
				const { key, ...optionProps } = props;
				return (
					<li
						key={key}
						{...optionProps}
					>
						<Checkbox
							icon={icon}
							checkedIcon={checkedIcon}
							checked={selected}
						/>
						{genre.name}
					</li>
				);
			}}
			renderInput={(params) => (
				<TextField
					variant="standard"
					{...params}
					label="Жанры:"
				/>
			)}
		/>
	);
}
