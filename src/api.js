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
    return articleApi.get(`/articles/${article_id}`).then((response) => {
        return response.data.article
    }).catch((err) => {
        console.log(err)
    })
}