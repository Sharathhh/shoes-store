import React from 'react'
import Banner from '../Components/Banner/Banner'
import Popular from '../Components/Popular/Popular'
import Trending from '../Components/Trending/Trending'
import Footer from '../Components/Footer/Footer'
import Banner2 from '../Components/Banner-2/Banner2'

function Shop() {
  return (
    <div className='shop'>
        <Banner/>
        <Popular/>
        <Banner2/>
        <Trending/>
        

    </div>
  )
}

export default Shop