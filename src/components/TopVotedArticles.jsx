import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';

function TopVotedArticles({ articles }) {
    // Sorting and slicing to get the top 10 voted articles
    const topVotedArticles = articles
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 10);

    return (
        <Carousel 
            showThumbs={false}
            autoPlay 
            infiniteLoop 
            showStatus={false} 
            emulateTouch
            interval={5000}
        >
            {topVotedArticles.map(article => (
                <div key={article.article_id} className="carousel-slide">
                    <Link to={`/articles/${article.article_id}`}>
                        <img src={article.article_img_url} alt={article.title} />
                        <div className="carousel-caption">
                            <h3>{article.title}</h3>
                            <p>Votes: {article.votes}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </Carousel>
    );
}

export default TopVotedArticles;
