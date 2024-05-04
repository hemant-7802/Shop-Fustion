import React from 'react'
import Signup from '../signup/Signup'
import Login from '../login/Login'
import Navbar from '../../components/navbar/Navbar'
import Category from '../../components/category/Category'
import Footer from '../../components/footer/Footer'
import Cards from '../../components/card/Cards'
import Heropage from '../../components/heropage/Heropage'
import Testimonial from '../../components/testimonial/Testimonial'

const Home = () => {
    return (
        <>
            {/* <Signup />
            <Login /> */}
            <Navbar />
            <Category />
            <Heropage />
            {/* <Cards /> */}
            <Testimonial/>
            <Footer />
        </>
    )
}

export default Home