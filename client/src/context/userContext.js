import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({
    children
}) => {
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

        return(
            <AuthContext.Provider value={values}>
                {children}
            </AuthContext.Provider>
        )
}