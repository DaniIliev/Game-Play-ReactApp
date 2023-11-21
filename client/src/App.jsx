import { useState } from 'react'
import Header from './components/header/Header'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/home/home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Create from './components/create/Create'
import Catalog from './components/catalog/Catalog'
import GameDetails from './components/details/GameDetails'
import * as userService from './services/userService'
import AuthContext from './context/userContext'
import Logout from './components/logout/logout'

function App() {
  const [auth, setAuth] = useState(() => {
    localStorage.removeItem('accessToken')

    return {}
  })

  const navigate = useNavigate()

  const loginSubmitHandler = async (values) => {
    try{
      const result = await userService.login(values.email, values.password)
      setAuth(result)

      localStorage.setItem('accessToken', result.accessToken);

      navigate('/')
    }catch(err){
      console.log(err)
    }
  }

  const registerSubmitHandler = async (values) =>{
    try{
      const result = await userService.register(values.email, values.password, values.confirmPassword)
      setAuth(result)

      localStorage.setItem('accessToken', result.accessToken);

      navigate('/')
    }catch(err){
      console.log(err)
    }
  }

  const logoutHandler = async (values) => {
      setAuth({})

      localStorage.removeItem('accessToken')
  }
  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    username: auth.username || auth.email,
    email: auth.email,
    isAuthenticated: !!auth.accessToken,
  }
  return (
    <>
    <AuthContext.Provider value={values}>
    <div id='box'>
      <Header/>
      
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/all-games' element={<Catalog/>}/>
          <Route path='/game-details/:gameId' element={<GameDetails/>}/>
          <Route path='/user/login' element={<Login/>} />
          <Route path='/user/register' element={<Register/>}/>
          <Route path='/user/logout' element={<Logout/>}/>
          <Route path='/create-game' element={<Create/>} />
      </Routes>

    </div>
    </AuthContext.Provider>
    </>
  )
}

export default App
