import { createFileRoute } from "@tanstack/react-router"
import Designer from "../pages/designer"

export const Route = createFileRoute("/")({
	component: Designer,
})
