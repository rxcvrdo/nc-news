import { createContext,useState } from "react";
/* eslint-disable react/prop-types */

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [user, setUser] = useState({
        username: "jessjelly",
        avatar_url: "https://example.com/avatar.jpg",
        name: "Jessica Jelly"
    })

    return (
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}