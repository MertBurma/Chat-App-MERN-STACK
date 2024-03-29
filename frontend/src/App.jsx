import './App.css'
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Home from "./pages/home/Home.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {useAuthContext} from "./context/authContext.jsx";
import {Toaster} from "react-hot-toast";

function App() {
    const {authUser} = useAuthContext();

  return (
      <div className="p-4 h-screen flex items-center justify-center">
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={authUser ? <Navigate to="/"/> : <Signup />}/>
          </Routes>
          <Toaster/>
      </div>
       

  )
}
export default App
