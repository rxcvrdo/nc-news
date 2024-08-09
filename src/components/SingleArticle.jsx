import { useParams } from "react-router-dom"
import { useContext, useEffect,useState } from "react"
import {deleteComment, getArticleById, getCommentsByArticleId, postComment, voteOnArticle} from '../api'
import Loading from '../components/Loading'
import CommentCard from "./CommentCard"
import { UserContext } from "../contexts/User"
/* eslint-disable react/prop-types */


function SingleArticle(){
const [comments, setComments] = useState([])
const [singleArticle, setSingleArticle] = useState({})
const {article_id} = useParams()
const [loading, setLoading]=useState(true)
const [voteError, setVoteError] = useState(null)
const [newComment, setNewComment] = useState('')
const [isPosting, setIsPosting] = useState(false)
const [commentError, setCommentError] = useState(null)
const {user} = useContext(UserContext)
const [deleteError, setDeleteError] = useState(null)
useEffect(() => {
  setLoading(true)
    getArticleById(article_id).then((articleObj) => {
        setSingleArticle(articleObj)
        return getCommentsByArticleId(article_id)
    })
    .then((comments) => {
      setComments(comments)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
    })
}, [article_id])

const handleVote = (increment) => {
  setSingleArticle(prevArticle => ({ ...prevArticle, votes: prevArticle.votes + increment }));
  setVoteError(null);

  voteOnArticle(article_id, increment)
      .then((updatedArticle) => {
          setSingleArticle(updatedArticle);
      })
      .catch((error) => {
        console.log(error)
          setSingleArticle(prevArticle => ({ ...prevArticle, votes: prevArticle.votes - increment })); // Revert vote on error
          setVoteError('Failed to update vote. Please try again.');
      });
};

function handleCommentSubmit(event){
  event.preventDefault()
  if(newComment.trim()===''){
    setCommentError('Comment can not be empty, please fill and try again')
    return 
  }

  setIsPosting(true)
  setCommentError(null)

  const commentObject = {
    username: user.username,
    body: newComment
  }

  postComment(article_id, commentObject)
  .then((postedComment) => {
    setComments((prevComm) => [postedComment, ...prevComm])
    setNewComment('')
    setIsPosting(false)
  }).catch((error) => {
    setCommentError('failed to post comment :( please try again')
    setIsPosting(false)
  })
}

function handleChange(event) {
  setNewComment(event.target.value)
}

function handleDeleteComment(commentId){
  const updatedComments = comments.filter(comment => comment.comment_id !==commentId)
  setComments(updatedComments)

  deleteComment(commentId)
  .then(() => {
    setComments((prevComments) => prevComments.filter(comment => comment.comment_id !==commentId))
  })
  .catch((error) => {
    setDeleteError('failed to delete comment, try again later!')
  })
}

function formatDate(isoString) {
    const date = new Date(isoString);
  
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  

    return date.toLocaleDateString('en', options);
  }

  if(loading){
    return <Loading/>
  }

    return (
      <div className="single-article-container">
    <div className="single-article">
    <h2 className='article-name'>{singleArticle.title}</h2>
    <h4 className= 'article-author'> {singleArticle.author}</h4>
    <img id="item-img" src={singleArticle.article_img_url}></img>
    <p className="article-body">{singleArticle.body}</p>
    <p className="article-created-at">{formatDate(singleArticle.created_at)}</p>
    <div className="vote-section">
      <button onClick={() => handleVote(1)}>Upvote </button>
      <button onClick ={() => handleVote(-1)}>Downvote</button>
      <p>{singleArticle.votes} votes</p>
      
      {voteError && <p className="error">{voteError}</p>}
    </div>
     </div>
     <div className="comments-section">
      <h4>Comments</h4>
      <form onSubmit={handleCommentSubmit}>
      <textarea value={newComment} onChange={handleChange}
      placeholder="add your comment here"
      disabled={isPosting}>
      </textarea>

      <button type="submit" disabled={isPosting}>Post</button>
      {commentError && <p className="error">{commentError}</p>}


    </form>
      {comments.length> 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment.comment_id} comment={comment} 
          canDelete={comment.author ===user.username} setComments={setComments}/>
        ))
      ): (
        <p>No comments yet.</p>
      )}

    

     </div>

    </div>
  )
}

export default SingleArticle
