import { createFileRoute } from "@tanstack/react-router"
import Designer from "../pages/designer/designer"

type Route = {
    email: string
    token: string 
    pageId?: string | null
}

export const Route = createFileRoute('/interactive-content-designer' as never)({
    component: Designer,
    validateSearch: (search: Record<string, unknown>): Route => {
        // validate and parse the search params into a typed state
        return {
            pageId: (search.pageId as string) || null,
            email: (search.email as string),
            token: (search.token as string) 
        }
    }
})