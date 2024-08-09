/* eslint-disable react/prop-types */
import { useState } from "react"

function Avatar({avatarUrl, username, name}) {
const [dropOpen, setDropOpen] = useState(false)

function toggleDropdown(){
    setDropOpen(!dropOpen)
}

return (
    <div className="avatar-container">
        <img src={avatarUrl} alt={ `${username}'s avatar`} className="avatar-image" onClick={toggleDropdown} />
  
    </div>
)
}

export default Avatar