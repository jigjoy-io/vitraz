import { NotFoundError } from "../util/errors/not-found-error"

export const API_HOST = process.env.REACT_APP_API

export async function accessPage(id: string, pageNotFoundMessage) {
	const res: any = await fetch(`${API_HOST}/access/${id}`)
	if (res.status == 404) throw new NotFoundError(pageNotFoundMessage)
	return await res.json()
}

export async function getPage(id: string) {
	const res: any = await fetch(`${API_HOST}/${id}`)
	return await res.json()
}

export async function getPages(origin: string) {
	const res: any = await fetch(`${API_HOST}/pages/${origin}`)
	return await res.json()
}

export async function createPage(page: any) {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(page),
	}

	const res: any = await fetch(`${API_HOST}/`, options)
	return await res.json()
}

export async function updatePage(page: any) {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(page),
	}

	const res = await fetch(`${API_HOST}/`, options)
	return await res.json()
}

export async function removePage(id: any) {
	const options = {
		method: "DELETE",
	}

	const res = await fetch(`${API_HOST}/${id}`, options)
	return await res.json()
}

export async function publishPage(page: any) {
	const options = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(page),
	}

	const res = await fetch(`${API_HOST}/publish`, options)
	return await res.json()
}
