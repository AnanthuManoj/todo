import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import { isLoginContext } from './context/ContextShare';
import { useContext } from 'react';

function App() {
  const {islogin, setIsLogin}=useContext(isLoginContext)

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route  path="/home" element={islogin?<Home />:<Navigate to={'/'}/>} />
      </Routes>
    </>
  )
}

export default App
