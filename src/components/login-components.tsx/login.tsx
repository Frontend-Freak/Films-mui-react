import FormCard from "./form-card";
import { DEFAULT_STRING_VALUE } from "../../shared/constants";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthTokenContext } from "./../../context/context";

export default function Form() {
	const [isVisibleTokenForm, setIsVisibleTokenForm] = useState(false);
	const [emailValue, setEmailValue] = useState(DEFAULT_STRING_VALUE);
	const [userId, setUserId] = useState<string | null>(null);
	const navigate = useNavigate();

	const { token, setToken } = useAuthTokenContext();

	useEffect(() => {
		async function fetchingID() {
			if (!token) return;
			const url = "https://api.themoviedb.org/3/account";
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
				setUserId(result.id);
				localStorage.setItem("id", userId || "");
				console.log(result);
			} catch (error) {
				console.error(error);
			}
		}
		fetchingID();
	}, [token, userId]);

	function handleOpenTokenFormClick() {
		setIsVisibleTokenForm(true);
	}

	function handleLoginHomePageClick() {
		setIsVisibleTokenForm(false);
		navigate("/");
	}

	function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		setEmailValue(e.target.value);
	}

	function handleTokenValueChange(e: React.ChangeEvent<HTMLInputElement>) {
		setToken(e.target.value);
	}

	return (
		<>
			{!isVisibleTokenForm && (
				<FormCard
					title="Запросить токен"
					textFieldLabel="Почта"
					cancelButton="Отмена"
					submitButton="Запросить"
					onClick={handleOpenTokenFormClick}
					value={emailValue}
					onChange={handleEmailChange}
				/>
			)}
			{isVisibleTokenForm && (
				<FormCard
					title="Введите токен"
					textFieldLabel="Токен"
					cancelButton="Отмена"
					submitButton="Ок"
					onClick={handleLoginHomePageClick}
					value={token}
					onChange={handleTokenValueChange}
				/>
			)}
		</>
	);
}
