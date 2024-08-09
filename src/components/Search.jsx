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
                Search Articles 
                <input id="search-input" value={searchInput} onChange={handleChange} type="text"></input>
                <button className="search-button"  type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} className='mag-icon'/></button>
            </label>
        </form>
        </div>
    )
}

export default Search