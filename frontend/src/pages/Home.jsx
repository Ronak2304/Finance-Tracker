import React from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Home = () => {
  const {authUser} = useAuthStore() 
  const navigate = useNavigate()
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
        <div onClick={()=>navigate('/add-finance')} className='cursor-pointer'>
          Add Finance
        </div>
        <div onClick={()=>navigate('/view-finances')} className='cursor-pointer'>
          View Finance
        </div>
      </div>
    </div>
  )
}

export default Home