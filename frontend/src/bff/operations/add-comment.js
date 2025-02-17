import { addComment, getComments, getPost } from "../api";

export const addPostComment = async (userId, postId, content) => {
    await addComment(userId, postId, content);

    const post = await getPost(postId);

    const comments = await getComments(postId);

    return {
        error:  null,
        res:    {
            ...post,
            comments,
        }
        
    }

};