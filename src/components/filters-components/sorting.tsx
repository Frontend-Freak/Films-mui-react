import { Autocomplete, Box, TextField } from "@mui/material";
import { sortOptions } from "../../shared/constants";
import type { SortingTypes } from "../../shared/types";
import type { FiltersProps } from "../../shared/types";

export default function Sorting({ state, dispatch }: FiltersProps) {
	function handleSortChange(_: React.SyntheticEvent, newValue: SortingTypes | null) {
		if (newValue) {
			dispatch({ type: "SET_SORTING", change: newValue });
		}
	}

	return (
		<Autocomplete
			options={sortOptions}
			value={state.sorting}
			onChange={handleSortChange}
			getOptionLabel={(option) => option.label}
			renderOption={(props, option) => {
				const { key, ...optionProps } = props;
				return (
					<Box
						key={key}
						component="li"
						{...optionProps}
					>
						{option.label}
					</Box>
				);
			}}
			renderInput={(params) => (
				<TextField
					variant="standard"
					{...params}
					label="Сортировать по:"
					slotProps={{
						htmlInput: {
							...params.inputProps,
							autoComplete: "new-password",
						},
					}}
				/>
			)}
		/>
	);
}
