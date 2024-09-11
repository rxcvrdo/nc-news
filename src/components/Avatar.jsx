/* eslint-disable react/prop-types */
import { useState } from "react"
import profileUser from '../assets/profileUser.png'

function Avatar({avatarUrl, username, name}) {
const [dropOpen, setDropOpen] = useState(false)

function toggleDropdown(){
    setDropOpen(!dropOpen)
}

return (
    <div className="avatar-container">
        <img src={profileUser} alt={ `${username}'s avatar`} className="avatar-image" onClick={toggleDropdown} />
  
    </div>
)
}

export default Avatar