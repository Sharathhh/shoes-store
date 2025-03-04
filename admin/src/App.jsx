import React from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'
import UserDetails from './Components/UserDetails/UserDetails'
import Data from './Components/Data/Data'
import Orderpage from './Pages/Orderpage'
import AdminLayout from './Pages/AdminLayout'
import ListProductPage from './Pages/ListProductPage'
import AddProductPage from './Pages/AddProductPage'
import Navbar from './Components/Naavbar/Navbar'
import Home from './Pages/Home'
function App() {
  return (
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin/*' element={<AdminLayout/>}>
        <Route path='addproduct' element={<AddProductPage/>}/>
        <Route path='listproduct' element={<ListProductPage/>}/>
        <Route path='allorders' element={<Orderpage/>}/>
        <Route path='allorders/userdetails/:orderId' element={<UserDetails/>}/>
        <Route path='datasummary' element={<Data/>}/>
        </Route>
    </Routes>
    
  )
}

export default App
