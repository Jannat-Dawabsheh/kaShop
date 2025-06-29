import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx'
import { ThemeProvider } from '@emotion/react';
import theme from './theme/index.jsx';
import './index.css'
import {  ToastContainer } from 'react-toastify';
import ModeContextProvider from './context/ModeContext.jsx';

createRoot(document.getElementById('root')).render(
  <ModeContextProvider>

    <App />
    <ToastContainer/>
  </ModeContextProvider>
)
