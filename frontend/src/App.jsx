import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./components/Home";
import { useAuthStore } from "./store/authStore";
import Login from "./components/login";
import { useEffect } from "react";
import Signup from "./components/signup";
const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  
  if(isCheckingAuth){
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Loading...</h1>
      </div>
    )
  }

  return (
        <div>
          <BrowserRouter>
            <Routes>
              <Route 
                path="/"
                element={authUser ? <Home /> : <Navigate to="/login" />}
              />
              <Route 
                path="/login"
                element={!authUser ? <Login /> : <Navigate to="/" />}
              />
              <Route 
                path="/signup"
                element={!authUser ? <Signup /> : <Navigate to="/" />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      )
}

export default App