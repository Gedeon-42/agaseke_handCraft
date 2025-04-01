import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import { ContextProvider } from './Context/ContextProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'




const client = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={client}>
    <ContextProvider>
    <RouterProvider router={router}/>
    </ContextProvider>
    </QueryClientProvider>
  
  
  </StrictMode>,
)
