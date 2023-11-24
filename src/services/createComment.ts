import { ICreateComment } from "../interfaces/Comment";

export const createComment = ({comment,setComments}: ICreateComment) => {
  const newComment = {
    id: generateUniqueId(),
    parentId: comment.parentId,
    commentText: comment.commentText,
  };

  setComments((prevComments) => [...prevComments, newComment]);
};


export const generateUniqueId = () => {
  return Date.now().toString();
};