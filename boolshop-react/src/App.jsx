// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import Header from './components/Header'
import Homepage from './pages/Homepage'
import DetailPage from './pages/DetailPage'
import Cart from './components/Cart'
import CheckOut from './pages/CheckOut'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Homepage />}></Route>
            <Route path='/:id' element={<DetailPage />}></Route>
            <Route path="/cart" element={<Cart />} />
            <Route path='//checkout' element={<CheckOut />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
