export interface IComment{
  id: string;
  parentId: string | undefined;
  commentText: string;
}

type CreateComment = Pick<IComment, "parentId" | "commentText">

export interface ICreateComment {
  comment: CreateComment;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;

}