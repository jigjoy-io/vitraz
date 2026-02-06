import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { store } from "./util/store"
import { JigJoyUIProvider } from "@jigjoy-io/ui-library"

const root = document.createElement("div")
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root)

const router = createRouter({
	routeTree,
	unmaskOnReload: true,
})

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

rootDiv.render(
	<React.StrictMode>
		<JigJoyUIProvider theme="dark">
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</JigJoyUIProvider>
	</React.StrictMode>,
)
