import { useState } from 'react'
import Header from './components/header/Header'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/home/home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Create from './components/create/Create'
import Catalog from './components/catalog/Catalog'
import GameDetails from './components/details/GameDetails'
import Logout from './components/logout/Logout'
import { AuthProvider } from './context/userContext'
import EditComponent from './components/game-edit/EditComponent'

function App() {

  return (
    <>
    <AuthProvider>
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
              <Route path='/game-edit/:gameId' element={<EditComponent/>}/>
          </Routes>

        </div>
    </AuthProvider>
    </>
  )
}

export default App
