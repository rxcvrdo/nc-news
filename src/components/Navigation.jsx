import { Link} from "react-router-dom"
import PostArticle from "./PostArticle"
import Users from "./Users"
import Avatar from "./Avatar"
import { UserContext } from "../contexts/User"
import { useContext } from "react"

function Navigation (){
    const {user} = useContext(UserContext)
    return (
        <>
        <nav>
            <Link to= "/post-article" element = {<PostArticle/>}>post </Link>
            <Link to= "/users" element={<Users/>}>users </Link>
            {user && (
                <Avatar 
                avatarUrl={user.avatar_url}/>
            )}
        </nav>
        </>
    )
}

export default Navigation