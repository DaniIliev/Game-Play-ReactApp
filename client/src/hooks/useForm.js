import { useState } from "react";


export default function useForm(initialValues, onSubmit){
    const [values, setValues] = useState(initialValues)

    const onChangeHandler = (e) => {
        setValues(state => ({
            ...state, 
            [e.target.name]: e.target.value
        }))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        onSubmit(values)

        setValues(initialValues)
    }

    return{
        values,
        onChangeHandler,
        onSubmitHandler
    }
}