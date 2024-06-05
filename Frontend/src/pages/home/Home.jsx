import React from 'react'
import Signup from '../signup/Signup'
import Login from '../login/Login'
import Navbar from '../../components/navbar/Navbar'
import Category from '../../components/category/Category'
import Footer from '../../components/footer/Footer'
import Heropage from '../../components/heropage/Heropage'
import Testimonial from '../../components/testimonial/Testimonial'
import HomePageProductCard from '../../components/heropageProductCard/HeroPageProductCard'

const Home = () => {
    return (
        <>
            {/* <Signup />
            <Login /> */}
            <Navbar />
            <Category />
            <Heropage />
            <HomePageProductCard />
            <Testimonial/>
            <Footer />
        </>
    )
}

export default Home