import axios from "axios"

export class PageService {


    apiUrl = process.env.REACT_APP_API || ""

    createPage(page: any) {
        return axios.post(this.apiUrl + '/', page)
    }

    getPage(id: any) {
        return axios.get(this.apiUrl + `/${id}`)
    }

    updatePage(page: any) {
        return axios.put(this.apiUrl + '/', page)
    }

    getPages(slug: any) {
        return axios.get(this.apiUrl + `pages/${slug}`)
    }



}