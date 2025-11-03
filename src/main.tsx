import "./reset.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorPage from "./components/error-page.tsx";
import Overview from "./components/movie-components/overview.tsx";
import Login from "./components/login-components/login.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FavoritePage from "./components/movie-components/favorite.tsx";
import { store } from "./store/auth-store.tsx";
import { Provider } from "react-redux";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/movie/:id",
		element: <Overview />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/favorite",
		element: <FavoritePage />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
