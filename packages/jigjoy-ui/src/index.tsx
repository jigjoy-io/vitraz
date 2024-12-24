import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import DocsOverview from "./docs"
import MathPractice from "./components/MathPractice"
import SpinTheWheel from "./components/SpinTheWheel"

const root = document.createElement("div")
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root)

rootDiv.render(
	<React.StrictMode>
		<SpinTheWheel />
	</React.StrictMode>,
)
