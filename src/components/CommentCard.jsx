/* eslint-disable react/prop-types */

function CommentCard({comment}){
    return (
        <div className="comment-card">
            <h4>{comment.author}</h4>
            <p>{comment.body}</p>
            <p><small>{new Date(comment.created_at).toLocaleDateString()}</small></p>
        </div>
    )
}

export default CommentCard