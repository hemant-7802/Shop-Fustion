import React from 'react'
import Button from '../button/Button'

const Cards = ({ cardName = 'shoes', cardImage = 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' }) => {
    return (
        <div className="card card-compact w-auto h-64 sm:w-64 sm:h-full bg-transparent shadow-sm shadow-red-200 justify-self-center">
            <figure><img src={cardImage} alt={cardName} className='h-52 object-cover' /></figure>
            <div className="flex flex-col justify-between p-2">
                <h3 className='capitalize font-medium text-md'>subtitle</h3>
                <p className='text-sm'>₹ 500</p>
                <div className='flex flex-wrap justify-end gap-2'>
                    <Button btnName='Add to Cart' className='bg-pink-600 text-sm py-2 px-4 mt-2 text-black font-semibold rounded-xl hover:bg-pink-500' />
                    <Button btnName='Buy Now' className='bg-pink-600 py-2 px-4 mt-2 text-sm text-black font-semibold rounded-xl hover:bg-pink-500' />
                </div>
            </div>
        </div>
    )
}

export default Cards