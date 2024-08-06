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
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="search-input">
                Search Articles 
                <input id="search-input" value={searchInput} onChange={handleChange} type="text"></input>
                <button type="submit">Search</button>
            </label>
        </form>
        </>
    )
}

export default Search