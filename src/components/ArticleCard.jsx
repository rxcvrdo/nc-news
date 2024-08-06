import {Link} from "react-router-dom"
import SingleArticle from "./SingleArticle"
/* eslint-disable react/prop-types */

function ArticleCard({article}) {
    function formatDate(isoString) {
        const date = new Date(isoString);
      
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        };
      
    
        return date.toLocaleDateString('en', options);
      }


    return (
        <section className="article-card">
            <Link to ={`/articles/${article.article_id}`}element={<SingleArticle/>}/>
            <h3 className="article-card-title"> {article.title}</h3>
            <h5>{article.author}</h5>
            <p>{formatDate(article.created_at)}</p>
            <p>{article.votes}</p>
        </section>
    )
    


}

export default ArticleCard