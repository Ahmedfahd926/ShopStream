import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Login } from './pages/LoginPage/Login'
import { Register } from './pages/RegisterPage/Register'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { ProduuctsPage } from './pages/ProductsPage/ProdcutsPage'
import { ProductDetails } from './pages/ProductDetailsPage/ProductDetails'
import { Cart } from './pages/Cart/Cart'
import { CartProvider } from './pages/Cart/CartContext'
import { ToastContainer } from 'react-toastify'
import { Userprofile } from './pages/UserProfile/UserProfile'
import { Checkout } from './pages/Checkout/Checkout'
import { AdminDashboard } from './pages/Admin/AdminDashboard'
import { NotFound } from './pages/NotFound/NotFound'

function StorefrontLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <>
      <CartProvider>
        <Routes>
          <Route element={<StorefrontLayout />}>
            <Route path='/Home' element={<Home />} />
            <Route path='/Products' element={<ProduuctsPage />} />
            <Route path='/Products/:id' element={<ProductDetails />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/User/:id' element={<Userprofile />} />
            <Route path='/Checkout' element={<Checkout />} />
          </Route>
        <Route path='/' element={<Login/>}/>
        <Route path='/Register' element={<Register/>} />
        <Route path='/admin' element={<AdminDashboard/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <ToastContainer position='top-right' autoClose={1500}/>
      </CartProvider>
    </>
  )
}

export default App
