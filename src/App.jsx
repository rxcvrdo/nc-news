import Header from "./components/Header";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import PostArticle from "./components/PostArticle";
import Users from "./components/Users";
import ArticleList from "./components/ArticleList";
import { useState } from "react";
import SingleArticle from "./components/SingleArticle";
import { UserProvider } from "./contexts/User";
import TopicDropdown from "./components/TopicDropdown";
import TopicPage from "./components/TopicPage";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Sidebar from "./components/SideBar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <UserProvider>
      <div>
        {loggedIn ? (
          <>
            <div id="header-nav">
              <Header setSearchTerm={setSearchTerm} setLoggedIn={setLoggedIn} />
              <Navigation setLoggedIn={setLoggedIn} />
            </div>
            <div className="app-container">
              <Sidebar />
              <main className="main-content">
                <Routes>
                  <Route
                    path="/articles"
                    element={<ArticleList searchTerm={searchTerm} />}
                  />
                  <Route path="/post-article" element={<PostArticle />} />
                  <Route path="/users" element={<Users />} />
                  <Route
                    path="/articles/:article_id"
                    element={<SingleArticle />}
                  />
                  <Route path="/topics/:topicSlug" element={<TopicPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Home setLoggedIn={setLoggedIn} />} />
            <Route path="*" element={<Home setLoggedIn={setLoggedIn} />} />
          </Routes>
        )}
      </div>
    </UserProvider>
  );
}

export default App;
