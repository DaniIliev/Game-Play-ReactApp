import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/userContext";


export default function Header(){
    const {isAuthenticated} = useContext(AuthContext)
    return(
        <header>
        <h1><Link className="home" to="/">GamesPlay</Link></h1>
        <nav>
            <Link to="/all-games">All games</Link>
            {isAuthenticated && (
                <div id="user">
                    <Link to="/create-game">Create Game</Link>
                    <Link to="/user/logout">Logout</Link>
                </div>
            )}
   
            {!isAuthenticated && (
                        <div id="guest">
                            <Link to="/user/login">Login</Link>
                            <Link to="/user/register">Register</Link>
                        </div>
            )}

        </nav>
    </header>
    )
}