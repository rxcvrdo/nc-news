/* eslint-disable react/prop-types */
import { useContext, useState } from "react"
import { UserContext } from "../contexts/User"
import { deleteComment } from "../api"


function CommentCard({comment, onDelete, canDelete, setComments}){
    const {user} =useContext(UserContext)
    const [isDeleting, setIsDeleting] = useState(false)

    function handleDelete(){
        console.log(comment.comment_id, '<<<deleting comment with ID')
        setIsDeleting(true)
        deleteComment(comment.comment_id)
        .then(() => {
            setComments((prevComments) => prevComments.filter(oldComments => oldComments.comment_id !==comment.comment_id))
            console.log('comment deleted successfully')
            // onDelete(comment.comment_id)
            setIsDeleting(false)
        })
        .catch((error) => {
            console.error('failed to delete comment. try again later', error)
        })
    }

    return (
        <div className="comment-card">
            <h4>{comment.author}</h4>
            <p>{comment.body}</p>
            {user && user.username ===comment.author && canDelete && (
                <button onClick={handleDelete} disabled={isDeleting} className="delete-button"> {isDeleting ? 'deleting...' : 'delete'}</button>
            )}
            <p><small>{new Date(comment.created_at).toLocaleDateString()}</small></p>
        </div>
    )
}

export default CommentCard