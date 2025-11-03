import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormCard from "./form-card";
import { DEFAULT_STRING_VALUE, getOptions, URL_GET_USER_ID } from "../../shared/constants";
import { fetchingApi } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import type { AuthState } from "../../store/auth-reducer";
import { setToken, setUserId } from "../../store/auth-action-types";

export default function Login() {
	const [isVisibleTokenForm, setIsVisibleTokenForm] = useState(false);
	const [emailValue, setEmailValue] = useState(DEFAULT_STRING_VALUE);
	const navigate = useNavigate();
	const token = useSelector((state: AuthState) => state.token);
	const dispatch = useDispatch();

	useEffect(() => {
		async function setId() {
			if (!token) return;
			try {
				const dataId = await fetchingApi({ url: URL_GET_USER_ID, options: getOptions(token) });
				dispatch(setUserId(dataId.id));
				localStorage.setItem("id", dataId.id || "");
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
