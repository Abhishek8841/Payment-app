import './App.css'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Send from './pages/Send'
import ProtectedRoute from './components/ProtectedRoute'
import { useState } from 'react'
function App() {
  const [loggedin, setLoggedin] = useState(false);
  return (
    <div>
      <Routes>

        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/signin' element={<Signin loggedin={loggedin} setLoggedin={setLoggedin}></Signin>}></Route>
        <Route path='/signup' element={<Signup loggedin={loggedin} setLoggedin={setLoggedin}></Signup>}></Route>

        <Route path='/dashboard' element=
          {<ProtectedRoute loggedin={loggedin}>
            <Dashboard></Dashboard>
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
