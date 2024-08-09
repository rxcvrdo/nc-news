import { useContext} from "react"
import { UserContext } from "../contexts/User"
/* eslint-disable react/prop-types */

useContext

function Home(){
const{user} = useContext(UserContext)

    return(
        <h1>Welcome {user.username}</h1>
    )
}

export default Home