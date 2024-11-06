import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { RouterProvider, createRouteMask, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { Amplify } from "aws-amplify"
import { persistor, store } from "./util/store"

import { PostHogProvider } from "posthog-js/react"
import { PersistGate } from "redux-persist/integration/react"
import { Helmet } from "react-helmet"

const options = {
	api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
}

Amplify.configure({
	Auth: {
		Cognito: {
			userPoolId: process.env.REACT_APP_USER_POOL_ID || "",
			userPoolClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID || "",
		},
	},
})

const root = document.createElement("div")
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root)

const designerRoute = createRouteMask({
	routeTree,
	from: "/interactive-content-designer",
	to: "/interactive-content-designer",
	params: () => ({
		action: undefined,
		token: undefined,
		email: undefined,
	}),
	search: true,
})

const router = createRouter({
	routeTree,
	routeMasks: [designerRoute],
	unmaskOnReload: true,
})

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

rootDiv.render(
	<React.StrictMode>
		<PostHogProvider apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY} options={options}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Helmet>
						<meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate" />
						<meta http-equiv="expires" content="0" />
						<meta http-equiv="pragma" content="no-cache" />
					</Helmet>
					<RouterProvider router={router} />
				</PersistGate>
			</Provider>
		</PostHogProvider>
	</React.StrictMode>,
)
