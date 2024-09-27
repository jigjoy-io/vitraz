import { createLazyFileRoute } from '@tanstack/react-router'
import Authorization from "../pages/authorization/Authorization"

export const Route: any = createLazyFileRoute('/' as never)({
	component: Authorization,
})
