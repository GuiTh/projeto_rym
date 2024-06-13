import React, {useEffect, useState} from "react";
import { getAlbumsByArtist } from "../../services/AlbumService";

interface Album{
    id: number;
    title: string;
    releaseDate?: string;
    coverUrl?: string
}

interface AlbumListProps{
    artist_id: number
}

const AlbumList: React.FC<AlbumListProps> = ({artist_id}) =>{
    const [albums, setAlbums] = useState<Album[]>([])

    useEffect(() =>{
        async function fetchAlbums(){
            try{
                const data = await getAlbumsByArtist(artist_id);
                setAlbums(data)
            }catch(error){
                console.error("Falha ao carregar os albums: ", error)
            }
        }

        fetchAlbums();
    }, [artist_id])

    return (
        <div>
            <h1>Albums</h1>
            <ul>
                {albums.map((album) =>(
                    <li key={album.id}>
                        {album.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AlbumList