import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { PerfilProvider } from './components/PerfilContext'; // Importa el proveedor del contexto

ReactDOM.createRoot(document.getElementById('root')).render(
  //se comenta el modo estricto para que pueda funcionar el elmento listas
  //<React.StrictMode>

  <PerfilProvider>
    <App />
  </PerfilProvider>

  //</React.StrictMode>
)
