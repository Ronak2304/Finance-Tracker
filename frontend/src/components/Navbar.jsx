import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { IoIosLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";


const Navbar = () => {
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="navbar bg-base-100 shadow-sm flex items-center justify-between px-4">
      {/* Logo / Brand */}
      <div className="flex-1" 
        onClick={()=> navigate('/')}
      >
        <a className="btn btn-ghost text-xl">FinTrack</a>
      </div>

      {/* Cart and Avatar */}
      <div className="flex items-center gap-4">
      
        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
            <li>
              <a>
                <FaRegUser />
                Profile
              </a>
            </li>
            <li><a onClick={handleLogout}><IoIosLogOut /> Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
