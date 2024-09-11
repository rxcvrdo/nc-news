import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../api"; // Make sure to adjust the path to your API utility


function Sidebar() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to load topics');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <nav className="sidebar">
      <h2 className="suse-header">Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
        <li><Link to = '/articles'> All</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
