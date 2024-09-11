import { Link } from "react-router-dom";
import { useState } from "react";
import {voteOnArticle} from '../api'
/* eslint-disable react/prop-types */

function ArticleCard({ article }) {
  const [votes, setVotes] = useState(article.votes);
  const [voteError, setVoteError] = useState(null);

  function formatDate(isoString) {
    const date = new Date(isoString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return date.toLocaleDateString("en", options);
  }

  // Handle voting logic
  const handleVote = (increment) => {
    setVotes((prevVotes) => prevVotes + increment);
    setVoteError(null);

    // Assuming voteOnArticle is the API call to update votes
    voteOnArticle(article.article_id, increment)
      .then(() => {
        // Voting was successful
      })
      .catch((error) => {
        setVotes((prevVotes) => prevVotes - increment); // Revert vote on error
        setVoteError("Failed to update vote. Please try again.");
      });
  };

  return (
    <Link to={`/articles/${article.article_id}`}>
      <section className="article-card">
        <div className="article-card-content">
          <div className="article-text">
            <h3 className="article-card-title"> {article.title}</h3>
            <h5>{article.author}</h5>
            <p>Date uploaded: {formatDate(article.created_at)}</p>
            <div className="vote-section">
              <button onClick={(e) => {
                e.preventDefault();
                handleVote(1);
              }}>👍</button>
              <button onClick={(e) => {
                e.preventDefault();
                handleVote(-1);
              }}>👎</button>
              <p>{votes} votes</p>
              {voteError && <p className="error">{voteError}</p>}
            </div>
          </div>
          <div className="article-img">
            <img src={article.article_img_url} alt={article.title} />
          </div>
        </div>
      </section>
    </Link>
  );
}

export default ArticleCard;
