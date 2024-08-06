import { Link} from "react-router-dom"
import PostArticle from "./PostArticle"
import Users from "./Users"
function Navigation (){
    return (
        <>
        <nav>
            <Link to= "/post-article" element = {<PostArticle/>}>post </Link>
            <Link to= "/users" element={<Users/>}>users </Link>
        </nav>
        </>
    )
}

export default Navigation