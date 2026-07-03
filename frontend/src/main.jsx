import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LeadsContextProvider } from './context/leadsContext'
import { AuthContextProvider } from './context/authContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <LeadsContextProvider>
        <App />
      </LeadsContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
