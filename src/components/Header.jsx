/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import Search from "./Search"
import logo from "../assets/logo.png"

function Header({setSearchTerm}){
    return (
        <>
        <h1 className="suse-header"> 
            <Link to="/articles">
            <img src={logo} alt="Nc News Logo" className="header-logo" />
             NC NEWS</Link>
        </h1>
        <><Search setSearchTerm={setSearchTerm}/></>
        </>
    )
}

export default Header