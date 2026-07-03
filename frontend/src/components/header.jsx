import { Link } from "react-router-dom"
import {useAuthContext} from "../context/authContext"
import { useLogout } from "../hooks/useLogout"

function Header(){
    const { user } = useAuthContext()
    const { logout } = useLogout()

    return (
        <header>
            <Link to='/'><h1>Leads Managemnt Sytem</h1></Link>
            <nav>
            {user && (
                <div>
                <span>{user.email}</span>
                <button onClick={logout}>Log out</button>
                </div>
            )}
            {!user && (
                <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                </div>
            )}
            </nav>
        </header>
        
    )
}

export default Header