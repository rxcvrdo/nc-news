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

// function Header({ setSearchTerm, setLoggedIn }) {
//     function handleLogout() {
//       setLoggedIn(false); // Set loggedIn to false
//     }
  
//     return (
//       <>
//         <h1>
//           <Link to="/articles">^ NC NEWS</Link>
//         </h1>
//         <input
//           type="text"
//           placeholder="Search Articles"
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button onClick={handleLogout}>Logout</button> {/* Add logout button */}
//       </>
//     );
//   }
  
//   export default Header;
  