import { useParams, useSearchParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleList from "./ArticleList";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function TopicPage(){
    const {topicSlug} = useParams()
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const [error, setError] = useState(null)

    const sortBy = searchParams.get('sort_by') || 'created_at';
    const order = searchParams.get('order') || 'desc';

    useEffect(() =>{
        setLoading(true)
        getArticles( "", topicSlug)
        .then((slugArticles) => {
            setArticles(slugArticles)
            setLoading(false)
        
        }).catch((error) => {
            if (error.response?.status ===404 ){
                setError('Topic not found')
            }else {
                    setError('Something has gone terribly wrong')
                }
            
        })
    } , [topicSlug,sortBy,order])

    if(loading) return <Loading/>

    if(error) {
        return <div>{error}</div>
    }

    return (
        <div id="articles-by-topic">
            <h1>Articles for {topicSlug}</h1>
            <ArticleList topic={topicSlug}/>

        </div>
    )
}

export default TopicPage