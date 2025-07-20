import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { useContext, useEffect } from 'react';
import { AuthContext } from './components/context/auth.context';
import { getAccountAPI, getCart } from './services/api.service';
import { Spin } from 'antd';
import LayoutApp from './components/share/Layout.app';
import ErrorPage from './pages/client/error';
import HomePage from './pages/client/home';
import DishPage from './pages/client/dish';
import { InfoPage } from './components/client/info/info';
import PrivateRoute from './share/private.route';
import LayoutAdmin from './components/admin/Layout.admin';
import LoginPage from './pages/client/login';
import RegisterPage from './pages/client/register';
import ConfirmPage from './components/client/Confirm/Confirm';
import AboutPage from './pages/client/about';
import './style/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/animation.css'
import './style/base.css'
import './style/home.css'
import './style/modal.css'
import './style/responsive.css'
import './style/login.css'
import 'antd/dist/reset.css';
import { InfoPageAdmin } from './components/admin/info/Info';
import IndexPage from './components/admin/index/IndexPage';
import TableDish from './components/admin/dish/Table.dish';
import OrderPage from './pages/client/order';
import OrderPageAdmin from './pages/admin/order/OrderPage';
import UserPageAdmin from './pages/admin/user/UserPage';


const LayoutClient = () => {
  const { isAppLoading } = useContext(AuthContext);
  return (
    <>
      {isAppLoading === true ?
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)"
        }}>
          <Spin />
        </div>
        :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }
    </>)
}

const App = () => {
  const { user, setUser, isAppLoading, setIsAppLoading, setCart, cart } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (<LayoutApp><LayoutClient /></LayoutApp>),
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

    {
      path: "/admin",
      element: (<LayoutApp>  <PrivateRoute> <LayoutAdmin></LayoutAdmin> </PrivateRoute> </LayoutApp>),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <IndexPage />
        },
        {
          path: "dish",
          element: <TableDish />
        },
        {
          path: "info",
          element: <InfoPageAdmin />
        }
        , {
          path: "order",
          element: <OrderPageAdmin />
        }
        , {
          path: "user",
          element: <UserPageAdmin />
        }
      ]
    }
  ]);



  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
