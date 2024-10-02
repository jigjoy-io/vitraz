import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider, createRouteMask, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { Amplify } from 'aws-amplify'
import { store } from './util/store'

import { PostHogProvider} from 'posthog-js/react'

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
}

Amplify.configure({
	Auth: {
		Cognito: {
			userPoolId: process.env.REACT_APP_USER_POOL_ID || '',
			userPoolClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID || ''
		}
	}
})

const root = document.createElement("div")
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root)


const dashboardRoute = createRouteMask({
	routeTree,
	from: '/dashboard',
	to: '/dashboard',
	params: (prev) => ({
		pageId: undefined,
		token: undefined,
		email: undefined
	}),
})

const router = createRouter({
	routeTree,
	routeMasks: [dashboardRoute],
	unmaskOnReload: true
})

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

rootDiv.render(
	<React.StrictMode>
		<PostHogProvider 
      		apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
      		options={options}>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</PostHogProvider>
	</React.StrictMode>
)