import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useSearchParams } from "react-router-dom";
import TopVotedArticles from "./TopVotedArticles";
/* eslint-disable react/prop-types */

function ArticleList({ searchTerm, topic }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setLoading(true);

    getArticles(searchTerm, topic, sortBy, order)
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchTerm, topic, sortBy, order]);

  function handleSortChange(event) {
    const [newSortBy, newOrder] = event.target.value.split(",");
    setSearchParams({ sort_by: newSortBy.trim(), order: newOrder.trim() });
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="article-list-content">
      {/* Carousel for top voted articles */}
      <div className="carousel-container">
        <TopVotedArticles articles={articles} />
      </div>

      {/* Sort control */}
      <div className="sort-control">
        <label htmlFor="sort-select"></label>
        <select
          id="sort-select"
          onChange={handleSortChange}
          value={`${sortBy}, ${order}`}
        >
          <option value="created_at, desc">Date (newest)</option>
          <option value="created_at, asc">Date (oldest)</option>
          <option value="votes, desc">Votes (highest)</option>
          <option value="votes, asc">Votes (lowest)</option>
          <option value="comment_count, desc">Comments (most)</option>
          <option value="comment_count, asc">Comments (least)</option>
        </select>
      </div>

      {/* Articles list */}
      <ul className="articles-list">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ul>

      {/* Scroll to top button */}
      <button className="scroll-to-top" onClick={scrollToTop}>
        Scroll to top
      </button>
    </div>
  );
}

export default ArticleList;
