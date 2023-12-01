import { useContext, useEffect, useReducer, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import * as gameService from '../../services/gameService'
import AuthContext from "../../context/userContext"
import * as commentService from '../../services/commentServoce'
import { reducer } from "./commentReducer"

export default function GameDetails(){
    const {email, userId} = useContext(AuthContext)
    const [game, setGame] = useState({})
    const [comments, dispatch] = useReducer(reducer,[])
    const {gameId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        commentService.getAll(gameId)
                .then(result => {
                    dispatch({
                        type: 'GET_ALL_COMMENTS',
                        payload: result
                    })
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
            formData.get('comment'),
        )
        newComment.owner = {email}

        dispatch({
            type: 'ADD_COMMENT',
            payload: newComment
        })
    }

    const deleteButtonClickHandler = async (e) =>{
        e.preventDefault()

        const hasConfirm = confirm(`Are you sure you want to delete the post with name ${game.title}?`)

        if(hasConfirm){
            gameService.del(game?._id)
                .then(() => navigate('/all-games'))
        }
    }
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
            <div className="details-comments">
                <h2>Comments:</h2>
                <ul>
                {comments.map(({ _id, comment, owner: { email } }) => (
                            <li key={_id} className="comment">
                                <p>{email}: {comment}</p>
                            </li>
                        ))}
                </ul>
                {comments.length === 0 && <p className="no-comment">No comments.</p>}
            </div>
                    {game._ownerId == userId && 
                            <div className="buttons">
                                <Link to={`/game-edit/${game?._id}`} className="button">Edit</Link>
                                <Link onClick={deleteButtonClickHandler} className="button">Delete</Link>
                            </div>
                    }
            


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