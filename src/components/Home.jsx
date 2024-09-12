import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/User";
import { getUsers } from "../api"; 

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    getUsers().then((fetchedUsers) => {
      setUsers(fetchedUsers);
      setLoading(false);
    });
  }, []);

  function handleUserChange(event) {
    const selectedUsername = event.target.value;
    const selectedUser = users.find((u) => u.username === selectedUsername);
    setUser(selectedUser);
  }

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="home-container">
      <h1>Welcome, {user.username}</h1>
      <p>Select a user to switch accounts:</p>

      <div className="user-select-container">
        <select value={user.username} onChange={handleUserChange}>
          {users.map((u) => (
            <option key={u.username} value={u.username}>
              {u.name} ({u.username})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Home;
