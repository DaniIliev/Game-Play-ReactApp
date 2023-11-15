import { useEffect, useState } from "react"
import * as gameServer from '../../services/gameService'
import { useNavigate } from "react-router-dom"
const initialValues = {
    title: '',
    category: '',
    maxLevel: '',
    imageUrl: '',
    summary: '',
}

export default function Create(){
    const [formValue, setFormValue] = useState(initialValues)
    const navigation = useNavigate()
    const onHandleChange = (e) => {
        setFormValue(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        gameServer.create(formValue)
            .then(() => navigation('/all-games'))
            .catch((err) => console.log(err))
    }

    return(
        <section id="create-page" className="auth">
            <form id="create" onSubmit={onSubmitHandler}>
                <div className="container">

                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" placeholder="Enter game title..." onChange={onHandleChange} />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" placeholder="Enter game category..." onChange={onHandleChange}/>

                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1" onChange={onHandleChange}/>

                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." onChange={onHandleChange}/>

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" onChange={onHandleChange}></textarea>
                    <input className="btn submit" type="submit" value="Create Game" />
                </div>
            </form>
        </section>
    )
}