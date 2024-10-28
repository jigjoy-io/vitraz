import { createLazyFileRoute } from "@tanstack/react-router"
import Authorization from "../pages/authorization/authorization"

export const Route: any = createLazyFileRoute("/" as never)({
	component: Authorization,
})
