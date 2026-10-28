import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { SettingsProvider } from './components/SettingsProvider'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><SettingsProvider><HashRouter><App /></HashRouter></SettingsProvider></React.StrictMode>
)
