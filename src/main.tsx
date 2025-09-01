// import '@ant.design/v5-patch-for-react-19';
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.ts'

localStorage.setItem('buttonAuth', JSON.stringify(['adminAdd', 'userAdd', 'userDelete']))

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
