import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const remoteElement = document.getElementById(
  "remote"
) as unknown as HTMLElement


const remote = ReactDOM.createRoot(remoteElement);

remote.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
)