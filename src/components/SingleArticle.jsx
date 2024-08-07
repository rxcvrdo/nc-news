import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import {getArticleById, getCommentsByArticleId} from '../api'
import Loading from '../components/Loading'
import CommentCard from "./CommentCard"
/* eslint-disable react/prop-types */


function SingleArticle(){
const [comments, setComments] = useState([])
const [singleArticle, setSingleArticle] = useState({})
const {article_id} = useParams()
const [loading, setLoading]=useState(true)

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
    <section> </section>
    <h2 className='article-name'>{singleArticle.title}</h2>
    <h4 className= 'article-author'> {singleArticle.author}</h4>
    <p className="article-body">{singleArticle.body}</p>
    <p className="article-created-at">{formatDate(singleArticle.created_at)}</p>
     </div>
     <div className="comments-section">
      <h4>Comments</h4>
      {comments.length> 0 ? (
        comments.map((comment) => (
          <CommentCard key={comment.comment_id} comment={comment}/>
        ))
      ): (
        <p>No comments yet.</p>
      )}

     </div>

    </div>
  )
}

export default SingleArticle
