import api from '../api';

// Interface para definir a estrutura de uma avaliação
interface Rating {
  rating_id: number;
  userId: number;
  albumId: number;
  rating: number;
}

// Função para criar uma nova avaliação
export const createRating = async (rating: Partial<Rating>): Promise<Rating> => {
  const response = await api.post('/ratings', rating);
  return response.data;
};

export const getRatingsByAlbum = async (albumId: number): Promise<Rating[]> => {
    const response = await api.get(`/ratings/album/${albumId}`);
    return response.data;
  };

// Função para atualizar uma avaliação
export const updateRating = async (ratingId: number, rating: Partial<Rating>): Promise<Rating> => {
    const response = await api.put(`/ratings/${ratingId}`, rating);
    return response.data;
  };
  
  // Função para deletar uma avaliação
  export const deleteRating = async (ratingId: number): Promise<void> => {
    await api.delete(`/ratings/${ratingId}`);
  };