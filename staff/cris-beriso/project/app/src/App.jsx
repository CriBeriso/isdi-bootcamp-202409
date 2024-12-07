import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Register, Login, Home, ProductDetails, Wishlist } from './view'

import { Header, Footer, Alert, Confirm } from './view/components'

import { Context } from './view/useContext'

import logic from './logic'

export default function App() {
  const [alert, setAlert] = useState({
    message: null,
    level: 'error'
  })

  const [confirm, setConfirm] = useState({
    message: null,
    level: 'error',
    callback: null
  })

  const navigate = useNavigate()

  const handleUserLoggedOut = () => navigate('/login')

  const handleLoginClick = () => navigate('/login')

  const handleUserRegistered = () => navigate('/login')

  const handleUserLoggedIn = () => navigate('/')

  const handleRegisterClick = () => navigate('/register')

  const handleGoWishlist = () => navigate('/wishlist')

  const handleAlertAccepted = () => setAlert({
    message: null,
    level: 'error'
  })
  const handleConfirmAccepted = () => {
    confirm.callback(true)

    setConfirm({
      message: null,
      level: 'error',
      callback: null
    })
  }

  const handleConfirmCancelled = () => {
    confirm.callback(false)

    setConfirm({
      message: null,
      level: 'error',
      callback: null
    })
  }

  return <Context.Provider value={{
    alert(message, level = 'error') { setAlert({ message, level }) },
    confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
  }}>
    <Header onLoggedOut={handleUserLoggedOut} />
    <Routes>
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick} />} />

      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered} />} />

      <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

      <Route path="/:productId" element={logic.isUserLoggedIn() ? <ProductDetails /> : <Navigate to="/login" />} />

      <Route path="/wishlist" element={logic.isUserLoggedIn() ? <Wishlist /> : <Navigate to="/login" />} />

    </Routes>

    <Footer onWishlist={handleGoWishlist} />

    {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

    {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
  </Context.Provider>
}