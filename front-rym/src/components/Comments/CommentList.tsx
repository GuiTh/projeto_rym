import React, { useEffect, useState } from 'react';
import { getCommentsByAlbum, Comment } from '../../services/comentsService';

interface Props {
  albumId: number;
}

const Comments: React.FC<Props> = ({ albumId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsByAlbum(albumId);
        setComments(data);
      } catch (error) {
        console.error("Erro ao buscar os comentários:", error);
      }
    };

    fetchComments();
  }, [albumId]);

  return (
    <div>
      <h2>Comentários</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.commentText}</li>
          ))}
        </ul>
      ) : (
        <p>Sem comentários.</p>
      )}
    </div>
  );
};

export default Comments;
