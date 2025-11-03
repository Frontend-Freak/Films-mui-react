

interface FetchType {
	url: string;
    options?: RequestInit
}

export async function fetchingApi({ url,options}: FetchType) {
	try {
		const response = await fetch(url, options);
		return await response.json();
	} catch (error) {
		console.error(error);
	}
}
