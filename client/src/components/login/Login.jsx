import { useContext } from "react"
import useForm from "../../hooks/useForm"
import AuthContext from "../../context/userContext"

const initialFormValues = {
    email: '',
    password: '',
}

export default function Login(){
    const {loginSubmitHandler} = useContext(AuthContext)
    const {values, onChangeHandler, onSubmitHandler} = useForm(initialFormValues, loginSubmitHandler)

    return(
        <section id="login-page" className="auth">
            <form id="login" onSubmit={onSubmitHandler}>

                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com" onChange={onChangeHandler} value={values.email}/>

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" onChange={onChangeHandler} value={values.password}/>
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    )
}