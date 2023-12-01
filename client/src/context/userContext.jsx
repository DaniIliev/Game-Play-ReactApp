import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import usePersistedState from "../hooks/usePersistedState";
import * as userService from '../services/userService'
const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({
    children
}) => {
    const navigate = useNavigate()
    const [auth, setAuth] = usePersistedState('auth', {})

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
    
      const logoutHandler = async () => {
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

        return(
            <AuthContext.Provider value={values}>
                {children}
            </AuthContext.Provider>
        )
}