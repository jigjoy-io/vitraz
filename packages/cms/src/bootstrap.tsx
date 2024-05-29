import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './util/store'

const hostDiv = document.getElementById("host") as unknown as HTMLElement
const host = ReactDOM.createRoot(hostDiv)

host.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)
