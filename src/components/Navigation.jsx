import { Link, useNavigate } from "react-router-dom";
import PostArticle from "./PostArticle";
import Users from "./Users";
import Avatar from "./Avatar";
import { UserContext } from "../contexts/User";
import { useContext } from "react";

function Navigation({ setLoggedIn }) { // Properly destructure setLoggedIn from props
  const { user, setUser } = useContext(UserContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear the user context
    setLoggedIn(false); // Set loggedIn to false to trigger logout
    navigate("/"); // Redirect to the home page after logout
  };

  return (
    <>
      <nav className="nav-buttons">
        {/* <Link to="/post-article" element={<PostArticle />}>
          Post
        </Link>
        <Link to="/users" element={<Users />}>
          Users
        </Link> */}
        <button onClick={handleLogout}>Logout</button>
        {user && <Avatar avatarUrl={user.avatar_url} />} {/* Display avatar if logged in */}
      </nav>
    </>
  );
}

export default Navigation;
