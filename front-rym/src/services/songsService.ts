import api from '../api';

// Interface para definir a estrutura de uma música
interface Song {
  song_id: number;
  title: string;
  artistId: number;
  albumId?: number;
}

// Função para criar uma nova música
export const createSong = async (song: Partial<Song>): Promise<Song> => {
  const response = await api.post('/songs', song);
  return response.data;
};

// Função para obter todas as músicas de um artista
export const getSongsByArtist = async (artistId: number): Promise<Song[]> => {
  const response = await api.get(`/songs/artist/${artistId}`);
  return response.data;
};

export const getSongsByAlbum = async (albumId: number) => {
    const response = await api.get(`/songs/album/${albumId}`);
    return response.data;
}
// Função para atualizar uma música
export const updateSong = async (songId: number, song: Partial<Song>): Promise<Song> => {
  const response = await api.put(`/songs/${songId}`, song);
  return response.data;
};

// Função para deletar uma música
export const deleteSong = async (songId: number): Promise<void> => {
  await api.delete(`/songs/${songId}`);
};