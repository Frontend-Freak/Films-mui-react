import { Box, Typography, Slider } from "@mui/material";
import type { FiltersProps } from "../../shared/types";

export default function FilteringByYears({ state, dispatch }: FiltersProps) {
	function valuetext(value: number) {
		return `${value}`;
	}

	function handleYearsChange(_: Event, newValue: number | number[]) {
		if (!Array.isArray(newValue)) return;
		dispatch({ type: "SET_YEARS", change: newValue as [number, number] });
	}

	return (
		<>
			<Box sx={{ height: "120px" }}>
				<Typography sx={{ height: "56px" }}>Год релиза:</Typography>
				<Slider
					sx={{ height: "0.5px" }}
					min={2000}
					max={2025}
					shiftStep={30}
					marks
					getAriaValueText={valuetext}
					onChange={handleYearsChange}
					value={state.selectedYears}
					step={1}
					valueLabelDisplay="auto"
				/>
			</Box>
		</>
	);
}
