import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import { useAuthStore } from "./store/authStore";
import Login from "./pages/Login";
import { useEffect } from "react";
import Signup from "./pages/Signup";
import AddFinances from "./pages/AddFinances";
import ViewFinances from "./pages/ViewFinances";
const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  

  if(isCheckingAuth){
    return (
      <div className="flex justify-center items-center h-screen">
        
      </div>
    )
  }

  return (
        <div>
          <BrowserRouter>
            <Routes>
              <Route 
                path="/"
                element={authUser ? <Home /> : <Navigate to="/Login" />}
              />
              <Route 
                path="/Login"
                element={!authUser ? <Login /> : <Navigate to="/" />}
              />
              <Route 
                path="/Signup"
                element={!authUser ? <Signup /> : <Navigate to="/" />}
              />
              <Route 
                path="/add-finance"
                element={authUser? <AddFinances/> : <Navigate to="/Login"/>}
              />
               <Route
                path="/view-finances"
                element={authUser? <ViewFinances />: <Navigate to="/Login"/>}
               />
            </Routes>
          </BrowserRouter>
        </div>
      )
}

export default App