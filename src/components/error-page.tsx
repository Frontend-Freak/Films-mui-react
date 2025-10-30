import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
	const error: unknown = useRouteError();
	console.error(error);
	if (isRouteErrorResponse(error)) {
		return (
			<>
				<h1>Oops!</h1>
				<p>Sorry, an unexpected error has occurred.</p>
				<p>
					<i>{error.statusText}</i>
				</p>
			</>
		);
	}
}
