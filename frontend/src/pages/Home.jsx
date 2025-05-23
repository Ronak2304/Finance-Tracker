import React from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Home = () => {
  const {logout, authUser} = useAuthStore() 
  const navigate = useNavigate()
  const handleLogout = async() =>{ 
    await logout()
    navigate('/login')
  }
  return (
    <div className="h-screen bg-gray-100">
      <Navbar />
      <div>
        {authUser && (
          <div className='text-3xl font-bold'>
            Welcome {authUser.fullName}
          </div>
        )}
      </div>
      <div className='flex gap-10'>
        <div onClick={()=>navigate('/add-finance')} >
          Add Finance
        </div>
        <div>
          View Finance
        </div>
      </div>
    </div>
  )
}

export default Home