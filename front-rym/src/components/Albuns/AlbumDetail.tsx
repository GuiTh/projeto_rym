import React, { useEffect, useState} from "react";
import { getAlbumsById, Album } from "../../services/AlbumService";



interface Props{
    albumId: number
}

const AlbumDetails: React.FC<Props> = ({ albumId }) =>{
    const [album, setAlbum] = useState<Album | null>(null)

    useEffect(() =>{
        const fetchAlbum = async () =>{
            try{
                const data = await getAlbumsById(albumId)
                setAlbum(data)
            }catch(error){
                console.error("erro ao buscar album", error)
            }
        }

        fetchAlbum()
    }, [albumId])

    if(!album){
        return <div>Carregando...</div>
    }

    return(
        <div>
            {album ? (
                <div>
                    <h2>{album.title}</h2>
                    <p>{album.artistName}</p>
                    <p>{album.releaseDate}</p>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    )
}

export default AlbumDetails