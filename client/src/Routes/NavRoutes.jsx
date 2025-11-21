import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

// import AddProduct from './AddProduct'
// import UpdateProduct from './UpdateProduct/UpdateProduct'

import Profile from './Profile'
import Home from '../Home'
import Signup from './Signup'
import PrivateComponent from './PrivateComponent'
import Login from './Login/Login'
import AddProduct from './Add product/AddProduct'
import Product from './Product/Products'
import Products from './Product/Products'
import UpdateProduct from './UpdateProduct/UpdateProduct'
// import Product from '../../../server/product'
const NavRoutes = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        //Private Component
        <Route element={<PrivateComponent/>}>
        <Route path='/'element={<Home/>}/>
        <Route path='/Products' element={<Products/>}/>
        <Route path="/AddProduct" element={<AddProduct/>}/>
        <Route path='/UpdateProduct' element={<Products/>}/>
        <Route path="/UpdateProduct/:id" element={<UpdateProduct/>}/>
        <Route path="/" element={<Home/>} />
        <Route path="/Profile" element={<Profile/>}/>
        </Route>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default NavRoutes
