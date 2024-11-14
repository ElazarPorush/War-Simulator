import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { io } from 'socket.io-client'

export const socket = io('http://localhost:8200/')
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
