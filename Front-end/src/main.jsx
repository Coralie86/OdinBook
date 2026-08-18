import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/common.css"
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Children from "./components/children.jsx"
import Listpost from "./components/listpost.jsx"
import Navbar from "./components/navbar.jsx"
import Connect from "./components/connect.jsx"
import {AuthProvider} from './services/authContext.jsx'
import ProtectedRoute from './components/protectedRoute.jsx'
import ErrorPage from './components/errorpage.jsx'


const router = createBrowserRouter([
  {
    path:"/",
    element:<Connect />,
  },
  {
    path:"/:page",
    element:<ErrorPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/app",
        element: <Navbar />,
        children: [
          {index: true, element: <Listpost />},
          {path:":page", element: <Children />},
        ],
      },
    ],
  }, 
  {
    path:"*",
    element:<ErrorPage />,
  },
])

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
