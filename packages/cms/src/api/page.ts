
export const API_HOST = process.env.REACT_APP_API

export async function getPage(id: string) {
    const res : any = await fetch(`${API_HOST}/${id}`)
    return (await res.json()).body
}

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