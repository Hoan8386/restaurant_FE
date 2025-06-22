import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DishPage from './pages/client/dish';
import HomePage from './pages/client/home';
import AboutPage from './pages/client/about';
import LoginPage from './pages/client/login';
import RegisterPage from './pages/client/register';
import App from './App';
import ErrorPage from './pages/client/error';
import './style/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/animation.css'
import './style/base.css'
import './style/home.css'
import './style/modal.css'
import './style/responsive.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/dish",
        element: <DishPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ]
  }
  // sử dụng children để những th con có thể kế thừa layout của thằng cha và dùng <Outlet/> trong thằng 
  // cha để cho thằng con kế thừa 
  ,

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
