import React from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {logout} = useAuthStore() 
  const navigate = useNavigate()
  const handleLogout = async() =>{ 
    await logout()
    navigate('/login')
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        Home
        <button onClick={handleLogout}>
          Logout
        </button>
    </div>
  )
}

export default Home