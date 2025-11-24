import './App.css'
import { Routes, useNavigate } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Send from './pages/Send'
import ProtectedRoute from './components/ProtectedRoute'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from './context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'
function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(false);
  const { userDetails, SetUserDetails, balance, setBalance } = useContext(AppContext);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    async function help() {
      setCheckingAuth(true);
      try {
        const response = await axios.get("http://localhost:4000/api/v1/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
          withCredentials: true,
        }
        );
        if (response.data.success) {
          SetUserDetails((prev) => {
            return {
              ...prev,
              email: response.data.me.username,
            }
          });
          setBalance(response.data.account.balance);
          toast.success(response.data.message);
          setLoggedin(true);
        }
        else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
      setCheckingAuth(false);
    }
    help();
  }, []);
  if (checkingAuth) return (<div>Loading Pls Wait</div>);
  return (
    <div>
      <Routes>

        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/signin' element={<Signin loggedin={loggedin} setLoggedin={setLoggedin}></Signin>}></Route>
        <Route path='/signup' element={<Signup loggedin={loggedin} setLoggedin={setLoggedin}></Signup>}></Route>

        <Route path='/dashboard' element=
          {<ProtectedRoute loggedin={loggedin}>
            <Dashboard setLoggedin={setLoggedin}></Dashboard>
          </ProtectedRoute>}>
        </Route>

        <Route path='/send' element=
          {<ProtectedRoute loggedin={loggedin}>
            <Send></Send>
          </ProtectedRoute>}>
        </Route>

      </Routes>

    </div>);
}

export default App
