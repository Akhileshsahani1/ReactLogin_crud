import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import Login from "./Login";
import Register from "./Components/Register";
import EditPage from "./EditPage";
import React, {useEffect, useState } from "react";
import PageNoteFound from "./Components/PageNoteFound";
import AddUser from "./Components/AddUser";
import Logout from "./Components/Logout";





function App() {
  const [token,setToken]=useState("")
  const [userGetData, setUserGetData] = useState(null);
 
  function PrivateRoute({ children }) {
    const auth = localStorage.getItem("token");
    return auth ? children : <Navigate to="/" />;
  }

  function PublicRoute({ children }) {
    const auth = localStorage.getItem("token");
    return !auth ? children : <Navigate to="/dashboard" />;
  }
    
  const getToken=()=>{
    setToken(localStorage.getItem("token"))
  }
  console.log(token,"token")
useEffect(()=>{
  getToken()
},[])
  return (
    <>
      
        <Nav />
        <div className="App">
          <Routes>
            {/* <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} /> */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard  /></PrivateRoute>} />
            <Route path="/" element={<PublicRoute><Login setToken={setToken} /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/dashboard/Edit/:id" element={<PrivateRoute><EditPage /></PrivateRoute>} />
            <Route path="dashboard/addUser" element={<PrivateRoute><AddUser /></PrivateRoute>} />
            <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />
            <Route path="*" element={<PageNoteFound />} />
          </Routes>
        </div>
      
    </>
  );
}

export default App;
