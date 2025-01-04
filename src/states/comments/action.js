import api from "../../utils/api";

export const Action = {
  ADD_COMMENT: 'ADD_COMMENT'
}

export const asyncAddComment = (threadId, commentData) => async (dispatch) => {
  try {
    const newComment = await api.createComment(threadId, commentData);
    dispatch(addComment(newComment)); 
  } catch (error) {
    console.error('Error adding comment:', error);
  }
};

export const addComment = (comment) => ({
  type: Action.ADD_COMMENT,
  payload: comment,
});