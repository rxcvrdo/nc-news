import axios from "axios";

const articleApi = axios.create({
    baseURL:"https://ricardos-news.onrender.com/api/",
})

export const getArticles = (searchTerm = '', topic = null, sortBy = 'created_at', order = 'desc') => {
    return articleApi
    .get("/articles", {params: {
        searchTerm, topic, sort_by: sortBy, order}})
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

export const deleteComment =(commentId) => {
    return articleApi
    .delete(`/comments/${commentId}`)
    .then((response) => {
        if (response.status !== 204) {
            throw new Error('Failed to delete comment');
        }
        return response.data;
    })
    .catch((error) => {
        console.error('Error deleting comment:', error.response ? error.response.data : error.message);
        throw error;
    });
}

export const getTopics = () => {
    return articleApi
    .get(`/topics`)
    .then((response) => {
        return response.data.topics
    })
}