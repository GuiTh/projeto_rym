import React, {useEffect, useState} from "react";
import { getSongsByAlbum } from "../../services/songsService";

interface Song{
    title: string;
}

interface Props{
    albumId: number
}

const SongList: React.FC<Props> = ({albumId}) =>{
    const [songs, setSongs] = useState<Song[]>([])

    useEffect(() =>{
        const fetchSongs = async () =>{
            try{
                const data = await getSongsByAlbum(albumId)
                setSongs(data)
            }catch(error){
                console.log('erro ao retornar as musicas', error)
            }
        }

        fetchSongs()
    }, [albumId])


    return(
        <div>
            <h2>Musicas</h2>
            {songs.length > 0 ? (
                <ul>
                    {songs.map((song, index) =>(
                        <li key={index}>{song.title}</li>
                    ))}
                </ul>
            ) : (
                <p>Sem Musicas</p>
            )}
        </div>
    )
}

export default SongList