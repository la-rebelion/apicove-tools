import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const relaxedMode = process.env.NODE_ENV === 'development'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // in development mode I force the StrictMode to be disabled, becase:
  // React may double invoke some lifecycle methods and is generating conflicts with MochaRunner
  // @todo - enable or disable StrictMode for Development as needed
  relaxedMode ? (
    <App />
  ) : (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
