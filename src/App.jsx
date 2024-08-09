import Header from "./components/Header"
import Navigation from "./components/Navigation"
import { Route, Routes } from "react-router-dom"
import PostArticle from "./components/PostArticle"
import Users from "./components/Users"
import ArticleList from "./components/ArticleList"
import { useState } from "react"
import Search from "./components/Search"
import SingleArticle from "./components/SingleArticle"
import { UserProvider } from "./contexts/User"
import TopicDropdown from "./components/TopicDropdown"
import TopicPage from "./components/TopicPage"
import NotFound from "./components/NotFound"
import Home from "./components/Home"

function App() {
const [searchTerm, setSearchTerm] = useState("")


  return (
<UserProvider>
    <main>
      <div id="header-nav">
        <Header/>
        <Navigation/>
      </div>
      <TopicDropdown/>
      <Search setSearchTerm={setSearchTerm}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/articles" element ={
          <>

          <ArticleList searchTerm={searchTerm} />
          
          </>}/>
        <Route path="/post-article" element={<PostArticle/>}/>
        <Route path="/users" element={<Users/>}/>
        {""}
        <Route path="/articles/:article_id" element={<SingleArticle/>}/>
        <Route path="/topics/:topicSlug" element={<TopicPage />}/>
        <Route path="*" element={<NotFound/>}/>
      
      </Routes>

    </main>
    
    </UserProvider>
  )
}

export default App
