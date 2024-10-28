import { createFileRoute } from "@tanstack/react-router"
import Designer from "../pages/designer/designer"

type Route = {
	email: string | undefined
	token: string | undefined
	action: string | undefined
}

export const Route = createFileRoute("/interactive-content-designer" as never)({
	component: Designer,
	validateSearch: (search: Record<string, unknown>): Route => {
		// validate and parse the search params into a typed state
		return {
			email: search.email ? (search.email as string) : undefined,
			token: search.token ? (search.token as string) : undefined,
			action: search.action ? (search.action as string) : undefined,
		}
	},
})
