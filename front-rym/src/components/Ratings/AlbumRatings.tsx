import React, { useState, useEffect } from 'react';
import { getRatingsByAlbum } from '../../services/ratingService';

interface Props {
  albumId: number;
}

const AlbumRatings: React.FC<Props> = ({ albumId }) => {
  const [ratings, setRatings] = useState<any[]>([]); // Use any[] como tipo de estado

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const data = await getRatingsByAlbum(albumId);
        setRatings(data);
      } catch (error) {
        console.error('Failed to fetch ratings:', error);
        // Trate o erro conforme necessário
      }
    };

    fetchRatings();
  }, [albumId]);

  return (
    <div>
      <h2>Ratings do Álbum</h2>
      <ul>
        {ratings.map((rating, index) => (
          <li key={index}>
            <p>Rating: {rating.rating}</p> {/* Acesse os campos conforme necessário */}
            <p>Usuário ID: {rating.userId}</p>
            {/* Renderize outras informações do rating conforme necessário */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumRatings;