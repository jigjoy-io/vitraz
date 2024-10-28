import React from "react"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { useLanguage } from "../util/store"

export const Route = createRootRoute({
	component: RootRoute,
})

function RootRoute() {
	const lang = useLanguage()

	return (
		<div key={lang}>
			<Outlet />
		</div>
	)
}
