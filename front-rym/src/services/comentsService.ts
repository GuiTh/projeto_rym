import api from '../api'

export interface Comment {
    comment_id: number;
    userId: number;
    albumId: number;
    commentText: string;
  }

  export const createComment = async (comment: Partial<Comment>): Promise<Comment> => {
    const response = await api.post('/comments', comment);
    return response.data;
  };

  export const updateComment = async (comment_id: number, comment: Partial<Comment>): Promise<Comment> => {
    const response = await api.put(`/comments/${comment_id}`, comment);
    return response.data;
  };

  export const getCommentsByAlbum = async (album_id: number): Promise<Comment[]> => {
    const response = await api.get<Comment[]>(`/comments/album/${album_id}`);
    return response.data;
  };

  export const deleteComment = async (comment_id: number): Promise<void> => {
    await api.delete(`/comments/${comment_id}`);
  };