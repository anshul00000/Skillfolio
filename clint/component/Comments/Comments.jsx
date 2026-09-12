import { useState, useContext } from 'react';
import { Context } from '../../src/context/context_api.jsx';
import { useProject } from '../../hooks/useProject';
import './Comments.css';

function Comments({ projectId, comments = [], onUpdate }) {
  const { user } = useContext(Context);
  const { addComment, deleteComment, loading } = useProject();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      return;
    }

    const updatedProject = await addComment(projectId, commentText);
    if (updatedProject && onUpdate) {
      onUpdate(updatedProject);
      setCommentText('');
    }
  };

  const handleDeleteComment = async (commentId) => {
    const updatedProject = await deleteComment(projectId, commentId);
    if (updatedProject && onUpdate) {
      onUpdate(updatedProject);
    }
  };

  return (
    <>
      <button 
        className="interaction-btn comments-toggle-btn"
        onClick={() => setShowComments(!showComments)}
        title={`${comments.length} comment${comments.length !== 1 ? 's' : ''}`}
      >
        <i className="fa-solid fa-comment"></i>
        <span className="comment-count">{comments.length}</span>
      </button>

      {showComments && (
        <div className="comments-container">
          {user ? (
            <form onSubmit={handleAddComment} className="comment-form">
              <div className="comment-input-wrapper">
                <img
                  src={user.photo || '/default.jpg'}
                  alt={user.username}
                  className="comment-avatar"
                />
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="comment-input"
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  className="comment-submit-btn"
                  disabled={loading || !commentText.trim()}
                >
                  {loading ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fa-solid fa-paper-plane"></i>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="comment-login-prompt">
              <i className="fa-solid fa-lock"></i>
              <p>Please login to comment</p>
            </div>
          )}

          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((comment) => {
                // Handle both populated and non-populated user objects
                const commentUser = typeof comment.user === 'object' && comment.user !== null 
                  ? comment.user 
                  : null;
                
                const username = commentUser?.username || 'Unknown User';
                const userPhoto = commentUser?.photo || '/default.jpg';
                const userId = commentUser?._id || comment.user;

                return (
                  <div key={comment._id} className="comment-item">
                    <img
                      src={userPhoto}
                      alt={username}
                      className="comment-avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/default.jpg';
                      }}
                    />
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-username">
                          {username}
                        </span>
                        <span className="comment-time">
                          {new Date(comment.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                    </div>
                    {user && (user._id === userId) && (
                      <button
                        className="comment-delete-btn"
                        onClick={() => handleDeleteComment(comment._id)}
                        disabled={loading}
                        title="Delete comment"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="no-comments">
                <i className="fa-regular fa-comment"></i>
                <p>No comments yet. Be the first to comment!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Comments;
