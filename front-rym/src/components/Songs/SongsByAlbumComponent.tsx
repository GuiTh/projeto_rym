import React, { useState, useEffect } from 'react';
import { getSongsByAlbum } from '../../services/songsService';

interface Song {
  song_id: number;
  title: string;
}

interface Props {
  albumId: number;
}

const SongsByAlbumComponent: React.FC<Props> = ({ albumId }) => {
  const [songsByAlbum, setSongsByAlbum] = useState<Song[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await getSongsByAlbum(albumId);
        setSongsByAlbum(songs);
      } catch (error) {
        console.error('Erro ao buscar músicas por álbum:', error);
      }
    };

    fetchSongs();
  }, [albumId]);

  return (
    <div>
      <ul>
        {songsByAlbum.map((song) => (
          <li key={song.song_id}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SongsByAlbumComponent;
