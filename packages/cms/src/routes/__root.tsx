import React from "react"
import { createRootRoute, Outlet } from "@tanstack/react-router"

export const Route = createRootRoute({
    component: () => (<>
        <Outlet />
    </>
    ),
    notFoundComponent: () => {
        return <p>This page doesn't exist!</p>
    },
})
