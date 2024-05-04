import React from 'react'
import Input from '../input/Input'

const SearchBar = () => {
    return (
        <form action="" className='bg-red-700 w-[50%]'>
            <Input classname='w-full' placeholder='Search Items...' labelValue='false'/>
        </form>
    )
}

export default SearchBar