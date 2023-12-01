import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as gameService from '../../services/gameService'
import AuthContext from "../../context/userContext"
import * as commentService from '../../services/commentServoce'

export default function GameDetails(){
    const {email} = useContext(AuthContext)
    const [game, setGame] = useState({})
    const [comment, setComment] = useState([])
    const [comments, getAllComments] = useState([])
    const {gameId} = useParams()
    
    useEffect(() => {
        commentService.getAll(gameId)
                .then(result => {
                    getAllComments(result)
                })
                .catch(err => console.log(err))

        gameService.getOne(gameId)
                .then((data) => setGame(data))
                .catch((err) => console.log(err))
    }, [gameId])

    const addCommentHandler = async (e) => {
        e.preventDefault()
        console.log('in')

        const formData = new FormData(e.currentTarget);

        const newComment = await commentService.create(
            gameId,
            formData.get('comment')
        )
        console.log(newComment)
        setComment(state => [...state, {...newComment, author: {email}}])
    }
    console.log(comments)
    return(
        <section id="game-details">
        <h1>Game Details</h1>
        <div className="info-section">

            <div className="game-header">
                <img className="game-img" src={game.imageUrl} />
                <h1>{game.title}</h1>
                <span className="levels">MaxLevel: {game.maxLevel}</span>
                <p className="type">{game.category}</p>
            </div>

            <p className="text">
                {game.summary}
            </p>
        </div>
            {/* <!-- Bonus ( for Guests and Users ) --> */}
            <div className="details-comments">
                <h2>Comments:</h2>
                <ul>
                {comments.map(({ _id, comment, owner: { email } }) => (
                            <li key={_id} className="comment">
                                <p>{email}: {comment}</p>
                            </li>
                        ))}
                </ul>
                {/* <!-- Display paragraph: If there are no games in the database --> */}
                {comments.length === 0 && <p className="no-comment">No comments.</p>}
            </div>

            {/* /* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
            {/* <div className="buttons">
                <a href="#" className="button">Edit</a>
                <a href="#" className="button">Delete</a>
            </div> */}
            


        {/* /* <!-- Bonus --> */}
        {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" onSubmit={addCommentHandler}>
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input className="btn submit" type="submit" value="Add Comment" />
             </form> 
         </article> 

    </section>
    )
}