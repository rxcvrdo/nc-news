import { useParams } from "react-router-dom";
import { getArticlesByTopic } from "../api";
import ArticleList from "./ArticleList";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function TopicPage(){
    const {topicSlug} = useParams()
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        setLoading(true)
        getArticlesByTopic(topicSlug)
        .then((slugArticles) => {
            setArticles(slugArticles)
            setLoading(false)
        
        })
    } , [topicSlug])

    if(loading) return <Loading/>

    return (
        <div id="articles-by-topic">
            <h1>Articles for {topicSlug}</h1>
            <ArticleList topic={topicSlug}/>

        </div>
    )
}

export default TopicPage