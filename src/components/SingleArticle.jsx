import { useParams } from "react-router-dom"
import { useEffect,useState } from "react"
import {getArticleById} from '../api'
/* eslint-disable react/prop-types */


function SingleArticle(){

const [singleArticle, setSingleArticle] = useState({})
const {article_id} = useParams()

useEffect(() => {
    getArticleById(article_id).then((articleObj) => {
        setSingleArticle(articleObj)
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

    return (
    <div className="single-article">
    <section> </section>
    <h2 className='article-name'>{singleArticle.title}</h2>
    <h4 className= 'article-author'> {singleArticle.author}</h4>
    <p className="article-body">{singleArticle.body}</p>
    <p className="article-created-at">{formatDate(singleArticle.created_at)}</p>
    
    
    </div>)
}

export default SingleArticle
