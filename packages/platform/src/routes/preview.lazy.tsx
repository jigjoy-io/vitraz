import { createLazyFileRoute } from "@tanstack/react-router"
import Preview from "../pages/designer/preview"

export const Route = createLazyFileRoute("/preview" as never)({
	component: Preview,
})
