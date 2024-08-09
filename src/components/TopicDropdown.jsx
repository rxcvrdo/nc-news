import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getTopics} from '../api'
/* eslint-disable react/prop-types */


function TopicDropdown(){
    const [topics, setTopics] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getTopics().then((fetchedTopics) => {
            setTopics(fetchedTopics)
        } )
    }, [])
   
    function handleChange(event) {
        const selectedValue = event.target.value
        if(selectedValue) {
            navigate(selectedValue)
        }
    }
    return (
        <div className="topic-dropdown">
            <select onChange={handleChange}> 
            <option value=''>Select a topic</option>
            {topics.map((topic) => (
                <option key={topic.slug} value={`/topics/${topic.slug}`}>
                    {topic.slug}
                </option>
            ))}
        </select>
        </div>
    )
}

export default TopicDropdown