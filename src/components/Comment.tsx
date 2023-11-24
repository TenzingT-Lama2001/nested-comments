import {useState} from 'react';
import { IComment, ICreateComment } from '../interfaces/Comment';
import { createComment } from '../services/createComment';

interface CommentProps {
  comments: IComment[];
  comment : IComment;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>; 
}

export default function Comment({comment,setComments,comments}: CommentProps){

  const [isReplyOn,setIsReplyOn] = useState<boolean>(false)
  const [replyText, setReplyText] = useState<string>('');

  const commentBoxStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '12px',
    margin: '16px 0',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const replyButtonStyle = {
    backgroundColor: '#0079d3',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    marginTop: '8px',
    cursor: 'pointer',
    borderRadius: '4px',
  };

  function openReply(){
    setIsReplyOn(true)

  }

  function handleReply(){
    if (replyText.trim() === '') {
      return;
    }
    const newCommentPayload: ICreateComment = {
      comment: {
        parentId: comment.id,
        commentText: replyText
      },
      setComments
    }
    createComment(newCommentPayload)
    setReplyText('');
    setIsReplyOn(false)
  }

  const commentReplies = comments.filter((c) => c.parentId === comment.id);

  return (
    <div style={commentBoxStyle}>
      <p style={{ marginBottom: '12px' }}>{comment.commentText}</p>
      {/* Render Replies */}
      {commentReplies.length > 0 && (
        <div>
          <p>Replies:</p>
          {commentReplies.map((reply) => (
            <Comment key={reply.id} comments = {comments} comment={reply} setComments={setComments} />
          ))}
        </div>
      )}
      {
        isReplyOn ? (
        <div>
          <input
          type="text"
          placeholder="Enter your comment..."
          value={replyText}
          onChange = {(e) => setReplyText(e.target.value)}
          
          />
         
          <button onClick = {() => handleReply()}>Reply</button>
        </div>
        ) : ( 
        <button style={replyButtonStyle} onClick = {() => openReply()}>Reply</button>
        )
      }

    </div>
  );
}

