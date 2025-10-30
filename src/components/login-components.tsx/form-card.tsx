import { Box, Button, Card, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface LoginCardProps {
	title: string;
	textFieldLabel: string;
	cancelButton: string;
	submitButton: string;
	onClick: () => void;
	value: string;
	onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormCard({ title, textFieldLabel, cancelButton, submitButton, onClick, value, onChange }: LoginCardProps) {
	const navigate = useNavigate();

	function handleExitClick() {
		navigate("/");
	}

	return (
		<Box sx={{ background: "grey", width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Card sx={{ width: "444px", height: "183px", padding: "16px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
				<Typography sx={{ fontWeight: "500", fontSize: "20px" }}>{title}</Typography>
				<TextField
					label={textFieldLabel}
					variant="standard"
					sx={{ marginBottom: "20px" }}
					value={value}
					onChange={onChange}
				/>
				<Box sx={{ textAlign: "end" }}>
					<Button onClick={handleExitClick}>{cancelButton}</Button>
					<Button onClick={onClick}>{submitButton}</Button>
				</Box>
			</Card>
		</Box>
	);
}
