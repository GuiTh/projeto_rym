import React, { useEffect, useState } from 'react';
import { getRatingsByAlbum, Rating } from '../../services/ratingService';

interface Props {
  albumId: number;
}

const Ratings: React.FC<Props> = ({ albumId }) => {
  const [ratings, setRatings] = useState<Rating[]>([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const data = await getRatingsByAlbum(albumId);
        setRatings(data);
      } catch (error) {
        console.error("Erro ao buscar as avaliações:", error);
      }
    };

    fetchRatings();
  }, [albumId]);

  return (
    <div>
      <h2>Avaliações</h2>
      {ratings.length > 0 ? (
        <ul>
          {ratings.map((rating, index) => (
            <li key={index}>Nota: {rating.rating}</li>
          ))}
        </ul>
      ) : (
        <p>Sem avaliações.</p>
      )}
    </div>
  );
};

export default Ratings;
