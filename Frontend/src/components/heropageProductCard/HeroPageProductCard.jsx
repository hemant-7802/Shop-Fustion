import React from 'react'
import Cards from '../../components/card/Cards'

const HomePageProductCard = () => {
  return (
    <div className='text-gray-200 py-8 flex flex-col justify-center'>
      <h1 className='capitalize font-bold text-2xl sm:text-3xl text-center mb-8 sm:mb-16'>best selling products</h1>
      <div className='flex flex-wrap gap-10 justify-center p-2'>
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </div>
  )
}

export default HomePageProductCard
