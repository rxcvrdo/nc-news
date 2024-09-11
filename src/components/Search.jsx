import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {useState} from "react"
/* eslint-disable react/prop-types */

function Search({setSearchTerm}){
    
    
    const [searchInput, setSearchInput] = useState("")

    function handleSubmit(event) {
        event.preventDefault();
        setSearchTerm(searchInput)
        setSearchInput('')
        console.log(searchInput)
    }

    function handleChange(event){
    
        setSearchInput(event.target.value)
        
        
    }

    return (
        <div className="search-container">
        <form  onSubmit={handleSubmit} className="search-form">
            <label className="search-article-label" htmlFor="search-input">
                <input id="search-input" placeholder='Search Articles ' value={searchInput} onChange={handleChange} type="text"></input>
                
            </label>
        </form>
        </div>
    )
}

export default Search