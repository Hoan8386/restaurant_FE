import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dish",
    element: <div>Dish page</div>,
  },
  {
    path: "/about",
    element: <div>about page</div>,
  },
  {
    path: "/login",
    element: <div>login page</div>,
  },
  {
    path: "/register",
    element: <div>register page</div>,
  },
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
