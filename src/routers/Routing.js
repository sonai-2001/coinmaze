import React from 'react'
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom'
import Allcoins from '../pages/allcoins/Allcoins'
import CoinDetails from '../pages/coinDetails/CoinDetails'
import Cart from '../pages/cart/Cart'

const Routing = () => {
  return (
    <Router future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }} >
        <Routes>
            <Route path='/' element={<Allcoins/>}/>
            <Route path='/coins/:id' element={<CoinDetails/>}/>
            <Route path='/cart' element={<Cart/>}/>
        </Routes>
    </Router>
  )
}

export default Routing