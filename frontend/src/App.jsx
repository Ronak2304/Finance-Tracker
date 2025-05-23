import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import { useAuthStore } from "./store/authStore";
import Login from "./pages/login";
import { useEffect } from "react";
import Signup from "./pages/signup";
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
              <Route 
                path="/add-finance"
                element={authUser? <AddFinances/> : <Navigate to="/login"/>}
              />
               <Route
                path="/view-finances"
                element={authUser? <ViewFinances />: <Navigate to="/login"/>}
               />
            </Routes>
          </BrowserRouter>
        </div>
      )
}

export default App