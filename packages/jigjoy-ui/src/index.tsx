import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import DocsOverview from "./docs"

const root = document.createElement("div")
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root)

rootDiv.render(
	<React.StrictMode>
		<DocsOverview />
	</React.StrictMode>,
)
