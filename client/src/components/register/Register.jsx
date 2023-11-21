import { useContext } from "react"
import useForm from "../../hooks/useForm"
import AuthContext from "../../context/userContext"

const initialsFormValues = {
    email: '',
    password: '',
    confirmPassword: '',

}
export default function Register(){
    const {registerSubmitHandler} = useContext(AuthContext)
    const {values, onChangeHandler, onSubmitHandler} = useForm(initialsFormValues,registerSubmitHandler)

    return(

        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onSubmitHandler}>
            <div className="container">
                <div className="brand-logo"></div>
                <h1>Register</h1>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com" onChange={onChangeHandler} value={values.email} />

                <label htmlFor="pass">Password:</label>
                <input type="password" name="password" id="register-password" onChange={onChangeHandler} value={values.password}/>

                <label htmlFor="con-pass">Confirm Password:</label>
                <input type="password" name="confirmPassword" id="confirm-password" onChange={onChangeHandler} value={values.confirmPassword}/>

                <input className="btn submit" type="submit" value="Register" />

                <p className="field">
                    <span>If you already have profile click <a href="#">here</a></span>
                </p>
            </div>
        </form>
    </section>
    )
}