import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from '@store'
import './style.scss'

const MainApp = () => {
  return (
    // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    // </React.StrictMode>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<MainApp />)
