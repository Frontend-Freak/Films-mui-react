import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormCard from "./form-card";
import { DEFAULT_STRING_VALUE, URL_GET_USER_ID } from "../../shared/constants";
import { useSelector, useDispatch } from "react-redux";
import type { AuthState } from "../../store/reducers/auth-reducer";
import { setToken, setUserId } from "../../store/actions/auth-action";

export default function Login() {
	const [isVisibleTokenForm, setIsVisibleTokenForm] = useState(false);
	const [emailValue, setEmailValue] = useState(DEFAULT_STRING_VALUE);
	const navigate = useNavigate();
	const token = useSelector((state: AuthState) => state.token);
	const dispatch = useDispatch();

	useEffect(() => {
		async function setId() {
			if (!token) return;
			const options = {
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			try {
				const response = await fetch(URL_GET_USER_ID, options);
				const result = await response.json();
				dispatch(setUserId(result.id));
				localStorage.setItem("id", result.id || "");
			} catch (error) {
				console.error(error);
			}
		}
		setId();
	}, [token, dispatch]);

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
		dispatch(setToken(e.target.value));
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
