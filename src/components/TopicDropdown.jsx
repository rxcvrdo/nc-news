import { Link, useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */


function TopicDropdown({topics}){
    const navigate = useNavigate()
   
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