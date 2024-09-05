
export const API_HOST = process.env.REACT_APP_API

/**
 * Fetches a page from the API based on the provided ID.
 * @param {string} id - The ID of the page to fetch.
 * @returns {Promise<string>} A promise that resolves to the body of the fetched page.
 */
export async function getPage(id: string) {
    const res : any = await fetch(`${API_HOST}/${id}`)
    return (await res.json())
}

export async function getPages(origin: string) {
    const res : any = await fetch(`${API_HOST}/pages/${origin}`)
    return (await res.json())
}

/**
 * Creates a new page by sending a POST request to the API endpoint with the provided page data.
 * @param {any} page - The page data to be sent to the API.
 * @returns {Promise<any>} A promise that resolves to the JSON response from the API.
 */
export async function createPage(page: any) {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(page),
    }

    const res : any = await fetch(`${API_HOST}/`, options)
    return (await res.json())
}

/**
 * Updates a page by sending a PUT request to the API with the updated page data.
 * @param {any} page - The updated page data to be sent to the API.
 * @returns {Promise<any>} A promise that resolves to the JSON response from the API.
 */
export async function updatePage(page: any) {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(page),
    }

    const res = await fetch(`${API_HOST}/`, options)
    return (await res.json())
}

/**
 * Removes a page by sending a DELETE request to the API endpoint.
 * @param {any} page - The page object to be removed.
 * @returns {Promise<any>} A promise that resolves to the JSON response from the API.
 */
export async function removePage(id: any) {

    const options = {
        method: 'DELETE'
    }

    const res = await fetch(`${API_HOST}/${id}`, options)
    return (await res.json())
}

export async function publishPage(id: string) {

    const res : any = await fetch(`${API_HOST}/publish/${id}`)
    return (await res.json())
}