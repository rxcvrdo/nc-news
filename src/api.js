import axios from "axios";

const articleApi = axios.create({
    baseURL:"https://ricardos-news.onrender.com/api/",
})

export const getArticles = (searchTerm) => {
    return articleApi
    .get("/articles", {params: {search: searchTerm}})
    .then((response) => {
        return response.data.articles
    })
}

export const getArticleById= (article_id) => {
    return articleApi
    .get(`/articles/${article_id}`).then((response) => {
        return response.data.article
    }).catch((err) => {
        console.log(err)
    })
}

export const getCommentsByArticleId = (article_id) => {
    return articleApi
    .get(`/articles/${article_id}/comments`).then((response) => {
        return response.data.comments
    })

}

export const voteOnArticle = (article_id, increment) => {
    return articleApi
    .patch(`articles/${article_id}`,{inc_votes: increment})
    .then((response) => { 
        return response.data.article
    })
}

export const postComment = (article_id, commentObject) => {
    return articleApi
    .post(`articles/${article_id}/comments`, commentObject)
    .then((response) => {
        return response.data.comment
    })
}