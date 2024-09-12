import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/User";
import { getUsers } from "../api";
import { useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */ 

function Home({ setLoggedIn }) {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    getUsers().then((fetchedUsers) => {
      setUsers(fetchedUsers);
      setLoading(false);
    });
  }, []);

  function handleUserChange(event) {
    const selectedUsername = event.target.value;
    const selectedUser = users.find((user) => user.username === selectedUsername);
    setUser(selectedUser);
  }

  function handleLogin() {
   
    setLoggedIn(true);
    navigate("/articles"); 
  }

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="home-container">
      <h1>Welcome, {user?.username || "Guest"}</h1>
      <p>Select a user to switch accounts:</p>

      <div className="user-select-container">
        <select value={user?.username || ""} onChange={handleUserChange}>
          {users.map((u) => (
            <option key={u.username} value={u.username}>
              {u.name} ({u.username})
            </option>
          ))}
        </select>
      </div>

      
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Home;
