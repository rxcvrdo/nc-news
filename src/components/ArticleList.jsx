import {getArticles} from "../api"
import ArticleCard from "./ArticleCard"
import { useEffect, useState } from "react"
import Loading from "./Loading"
/* eslint-disable react/prop-types */

function ArticleList({searchTerm}){
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getArticles(searchTerm).then((articles) => {
            setArticles(articles)
            setLoading(false)
    }).catch((error) => {
        console.log(error)
    })
    }, [searchTerm])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    if(loading){
        return <Loading/>
    }


    return (
        <>
        <ul>
            {articles.map((article) => (
             <ArticleCard key={article.article_id} article={article} articles={articles}/>
            ))}
        </ul>

        <button className="scroll-to-top" onClick={scrollToTop}>Scroll to top</button>
        </>
    )
}

export default ArticleList