import React, { useState } from 'react';
import Comment from './components/Comment';
import { IComment, ICreateComment } from './interfaces/Comment';
import { createComment } from './services/createComment';

export const App = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentText, setCommentText] = useState<string>('');

  const inputStyle = {
    padding: '8px',
    fontSize: '16px',
    marginRight: '8px',
  };

  const buttonStyle = {
    padding: '8px 16px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const noCommentsStyle = {
    marginTop: '16px',
    fontSize: '18px',
    color: '#555',
  };

  function handleComment() {
    
      if (commentText.trim() === '') {
      return;
    }
    const newCommentPayload: ICreateComment = {
      comment: {
        parentId: undefined,
        commentText,
      },
      setComments,
    };
    createComment(newCommentPayload);
    setCommentText('');
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        style={inputStyle}
      />
      <button onClick={() => handleComment()} style={buttonStyle}>
        Comment
      </button>
      {comments.length > 0 ? (
        comments
          .filter((comment) => comment.parentId === undefined)
          .map((comment) => (
            <Comment key={comment.id} comments={comments} comment={comment} setComments={setComments} />
          ))
      ) : (
        <div style={noCommentsStyle}>No comments</div>
      )}
    </div>
  );
};
