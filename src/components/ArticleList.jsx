import {getArticles} from "../api"
import ArticleCard from "./ArticleCard"
import { useEffect, useState } from "react"
/* eslint-disable react/prop-types */

function ArticleList({searchTerm}){
    const [articles, setArticles] = useState([])

    useEffect(() => {
        getArticles(searchTerm).then((articles) => {
            setArticles(articles)
    }).catch((error) => {
        console.log(error)
    })
    }, [searchTerm])


    return (
        <>
        <ul>
            {articles.map((article) => (
             <ArticleCard key={article.article_id} article={article} articles={articles}/>
            ))}
        </ul>
        </>
    )
}

export default ArticleList