import React from 'react'
import LandingPage from "./components/LandingPage"
import { Routes , BrowserRouter, Route } from "react-router-dom";
import Cart from "./components/Cart"


export const config = {

  endpoint : `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`
}


const App = () => {
  return (
   
       <Routes>

        
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/cart" element={<Cart />} />

      </Routes>
      
  
  )
}

export default App