// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import Header from './components/Header'
import Homepage from './pages/Homepage'
import CatalogPage from './pages/CatalogPage'
import DetailPage from './pages/DetailPage'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'
import CheckOut from './pages/CheckOut'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

// Componente principale dell'applicazione che gestisce il routing e il context del carrello
function App() {

  return (
    <>
      <WishlistProvider>
        {/* Provider del carrello che rende disponibile il context a tutta l'app */}
        <CartProvider>
          {/* Router principale dell'app */}
          <BrowserRouter>
            <Routes>
              {/* Layout di default per tutte le pagine */}
              <Route element={<DefaultLayout />}>
                {/* Homepage */}
                <Route index element={<Homepage />}></Route>
                {/* Pagina catalogo */}
                <Route path="/catalog" element={<CatalogPage />} />
                {/* Pagina di dettaglio prodotto */}
                <Route path='/:id' element={<DetailPage />}></Route>
                {/* Pagina carrello */}
                <Route path="/cart" element={<Cart />} />
                {/* Pagina wishlist */}
                <Route path="/wishlist" element={<Wishlist />} />
                {/* Pagina checkout */}
                <Route path='/checkout' element={<CheckOut />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </>
  )
}

export default App
