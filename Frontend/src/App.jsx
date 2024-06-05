import React from 'react'
import Home from './pages/home/Home'
import NoPage from './no page/NoPage'
import { Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<NoPage />} />
      </Routes>
    </>
  )
}

export default App