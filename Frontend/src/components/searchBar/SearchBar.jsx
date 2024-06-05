import React, { useState } from 'react'
import Input from '../input/Input'

const SearchBar = () => {
    const [search, setSearch] = useState('')

    const searchData = [
        {
            name: 'tshirt',
            image: 'https://www.devknus.com/img/gawri.png'
        }
    ]

    const filterSearchData = searchData.filter((obj) => obj.name.toLowerCase().includes(search)).slice(0, 8)
    return (
        <>
            <form action="" className='w-full'>
                <Input
                    classname='w-full'
                    placeholder='Search Items...'
                    labelValue='false'
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </form>

            <div className='flex justify-center w-full relative'>
                {search && <div className='absolute block bg-white w-full z-50 my-0.5 rounded-lg p-2'>
                    {filterSearchData.length > 0 ? <>
                        {filterSearchData.map((item, index) => {
                            return (
                                <div key={index} className='p-2'>
                                    <div className='flex items-center gap-2'>
                                        <img src={item.image} className='w-10' alt="" />
                                        {item.name}
                                    </div>
                                </div>
                            )
                        })}
                    </> : <>
                        <div className='flex flex-col justify-center w-full items-center py-4'>
                            <img src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696458.jpg?size=626&ext=jpg&ga=GA1.1.779085289.1709228767&semt=ais_user" alt="image" className='w-1/3' />
                            <h1 className='text-black'>Product Not Found!</h1>
                        </div>
                    </>}
                </div>}
            </div>
        </>
    )
}

export default SearchBar