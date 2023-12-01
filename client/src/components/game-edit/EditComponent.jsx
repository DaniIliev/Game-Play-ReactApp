import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as gameService from '../../services/gameService'

const initialValues = { 
    title: '',
    category: '',
    maxLevel: '',
    imageUrl: '',
    summary: ''
}
export default function EditComponent(){

    const [values, setValues] = useState(initialValues)
    const {gameId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        gameService.getOne(gameId)
                .then((data) => setValues(data))

    }, [gameId])

    const onHandleChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const formData = Object.fromEntries(new FormData(e.currentTarget))
        gameService.put(gameId,formData)
            .then(() => navigate(`/game-details/${gameId}`))
    }

    return(
        <section id="create-page" className="auth">
        <form id="create" onSubmit={onSubmitHandler}>
            <div className="container">

                <h1>Edit Game</h1>
                <label htmlFor="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" placeholder="Enter game title..." onChange={onHandleChange} value={values.title} />

                <label htmlFor="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter game category..." onChange={onHandleChange} value={values.category}/>

                <label htmlFor="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1" onChange={onHandleChange} value={values.maxLevel}/>

                <label htmlFor="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." onChange={onHandleChange} value={values.imageUrl}/>

                <label htmlFor="summary">Summary:</label>
                <textarea name="summary" id="summary" onChange={onHandleChange} value={values.summary}></textarea>
                <input className="btn submit" type="submit" value="Create Game" />
            </div>
        </form>
    </section>
    )
}