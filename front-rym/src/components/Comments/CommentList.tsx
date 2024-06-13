import React, { useState, useEffect } from 'react';
import { getCommentsByAlbum } from '../../services/comentsService';

interface Comment {
  comment_id: number;
  userId: number;
  albumId: number;
  commentText: string;
}

const CommentList: React.FC<{ albumId: number }> = ({ albumId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchComments = async () => {
        try {
          const data = await getCommentsByAlbum(albumId);
          setComments(data);
        } catch (error) {
          console.error('Failed to fetch comments:', error);
          setMessage('Erro ao buscar comentários.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchComments();
    }, [albumId]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>Comentários</h1>
        {message ? (
          <p>{message}</p>
        ) : (
          <ul>
            {comments.map(comment => (
              <li key={comment.comment_id}>{comment.commentText}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default CommentList;