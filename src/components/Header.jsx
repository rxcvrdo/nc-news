/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import Search from "./Search"
function Header({setSearchTerm}){
    return (
        <>
        <h1> 
            <Link to="/articles">^ NC NEWS</Link>
        </h1>
        <><Search setSearchTerm={setSearchTerm}/></>
        </>
    )
}

export default Header