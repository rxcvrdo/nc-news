import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  deleteComment,
  getArticleById,
  getCommentsByArticleId,
  postComment,
  voteOnArticle,
} from "../api";
import Loading from "../components/Loading";
import CommentCard from "./CommentCard";
import { UserContext } from "../contexts/User";

function SingleArticle() {
  const [comments, setComments] = useState([]);
  const [singleArticle, setSingleArticle] = useState({});
  const { article_id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voteError, setVoteError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const { user } = useContext(UserContext);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getArticleById(article_id)
      .then((articleObj) => {
        setSingleArticle(articleObj);
        return getCommentsByArticleId(article_id);
      })
      .then((comments) => {
        setComments(comments);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          setError("Article not found");
        } else {
          setError("Something has gone terribly wrong");
        }
      });
  }, [article_id]);

  const handleVote = (increment) => {
    setSingleArticle((prevArticle) => ({
      ...prevArticle,
      votes: prevArticle.votes + increment,
    }));
    setVoteError(null);

    voteOnArticle(article_id, increment)
      .then((updatedArticle) => {
        setSingleArticle(updatedArticle);
      })
      .catch((error) => {
        setSingleArticle((prevArticle) => ({
          ...prevArticle,
          votes: prevArticle.votes - increment,
        }));
        setVoteError("Failed to update vote. Please try again.");
      });
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() === "") {
      setCommentError("Comment cannot be empty, please fill and try again.");
      return;
    }

    setIsPosting(true);
    setCommentError(null);

    const commentObject = {
      username: user.username,
      body: newComment,
    };

    postComment(article_id, commentObject)
      .then((postedComment) => {
        setComments((prevComm) => [postedComment, ...prevComm]);
        setNewComment("");
        setIsPosting(false);
      })
      .catch((error) => {
        setCommentError("Failed to post comment :( please try again.");
        setIsPosting(false);
      });
  };

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.comment_id !== commentId
    );
    setComments(updatedComments);

    deleteComment(commentId)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== commentId)
        );
      })
      .catch((error) => {
        setDeleteError("Failed to delete comment, try again later!");
      });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en", options);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="main-content">
      <div className="single-article">
        <h2 className="article-name">{singleArticle.title}</h2>
        <h4 className="article-author">by {singleArticle.author}</h4>
        <img
          id="item-img"
          src={singleArticle.article_img_url}
          alt={singleArticle.title}
        />
        <p className="article-body">{singleArticle.body}</p>
        <div className="article-footer">
        

        <div className="vote-section">
          <button onClick={() => handleVote(1)}>
            👍
          </button>
          <button onClick={() => handleVote(-1)}>
            👎
          </button>
          <p>{singleArticle.votes} votes</p>
          {voteError && <p className="error">{voteError}</p>}
          </div>
          <p>{formatDate(singleArticle.created_at)}</p>
        </div>
      </div>

   
      <div className="comments-section">
        <h4>Comments</h4>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={handleChange}
            placeholder="Add your comment here"
            disabled={isPosting}
          ></textarea>
          <button type="submit" disabled={isPosting}>
            Post
          </button>
          {commentError && <p className="error">{commentError}</p>}
        </form>

        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              canDelete={comment.author === user.username}
              setComments={setComments}
            />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default SingleArticle;
