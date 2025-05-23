import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

const Navbar = () => {
  const navigate = useNavigate()
  const {logout} = useAuthStore()
  const handleLogout = async() =>{ 
    await logout()
    navigate('/login')
  }
  return (
    <div className="flex justify-between w-full h-fit">
      <div>
        <a href="/">
          FinTrack
        </a>
      </div>
      <div className="flex gap-4">
        <div>
          profile image
        </div>
        <div onClick={()=>handleLogout()} className="cursor-pointer">
          Logout
        </div>
      </div>
    </div>
  )
}

export default Navbar