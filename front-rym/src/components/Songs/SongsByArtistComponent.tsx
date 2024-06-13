import React, { useState, useEffect } from 'react';
import { getSongsByArtist } from '../../services/songsService';

interface Song {
  song_id: number;
  title: string;
}

interface Props {
  artistId: number;
}

const SongsByArtistComponent: React.FC<Props> = ({ artistId }) => {
  const [songsByArtist, setSongsByArtist] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await getSongsByArtist(artistId);
        setSongsByArtist(songs);
      } catch (error) {
        console.error('Erro ao buscar músicas por artista:', error);
      }
    };

    fetchSongs();
  }, [artistId]);

  return (
    <div>
      <h2>Músicas por Artista</h2>
      <ul>
        {songsByArtist.map((song) => (
          <li key={song.song_id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SongsByArtistComponent;
