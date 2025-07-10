import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DishPage from './pages/client/dish';
import HomePage from './pages/client/home';
import AboutPage from './pages/client/about';

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
import './style/login.css'
import LoginPage from './pages/client/login';
import 'antd/dist/reset.css';
import { AuthWrapper } from './components/context/auth.context';
import { InfoPage } from './components/info/info';
import ConfirmPage from './components/Confirm/Confirm';
import OrderPage from './pages/client/order';


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
      {
        path: "/info",
        element: <InfoPage />,
      },
      {
        path: "/order",
        element: <OrderPage />,
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
  {
    path: "/confirm",
    element: <ConfirmPage />,
  },
]);



createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
)

