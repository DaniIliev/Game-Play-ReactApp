import { Link } from "react-router-dom";


export default function Header(){


    return(
        <header>
        <h1><Link className="home" to="/">GamesPlay</Link></h1>
        <nav>
            <Link to="/all-games">All games</Link>
            <div id="user">
                <Link to="/create-game">Create Game</Link>
                <Link to="/user/logout">Logout</Link>
            </div>
            <div id="guest">
                <Link to="/user/login">Login</Link>
                <Link to="/user/register">Register</Link>
            </div>
        </nav>
    </header>
    )
}