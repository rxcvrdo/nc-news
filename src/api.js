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