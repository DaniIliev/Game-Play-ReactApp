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

function App() {
  const [auth, setAuth] = useState([])

  const navigate = useNavigate()

  const loginSubmitHandler = async (values) => {
    try{
      const result = await userService.login(values.email, values.password)
      console.log(result)
      setAuth(result)
      navigate('/')
    }catch(err){
      console.log(err)
    }
  }

  const values = {
    loginSubmitHandler
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
          <Route path='/create-game' element={<Create/>} />
      </Routes>

    </div>
    </AuthContext.Provider>
    </>
  )
}

export default App
