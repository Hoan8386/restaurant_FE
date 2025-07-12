import { Outlet } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { useContext, useEffect } from 'react';
import { AuthContext } from './components/context/auth.context';
import { getAccountAPI, getCart } from './services/api.service';
import { Spin } from 'antd';

const App = () => {
  const { user, setUser, isAppLoading, setIsAppLoading, setCart, cart } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
    fetchCart();

  }, [])

  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    if (res.data) {
      setUser(res.data)
    }
    setIsAppLoading(false)
  }

  const fetchCart = async () => {
    const res = await getCart();
    if (res.data) {
      setCart(res.data)
    }
  }
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
    </>
  )
}

export default App
