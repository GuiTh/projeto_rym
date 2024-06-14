import React, {useEffect, useState} from "react";
import { getArtistById } from "../../services/artistService";

interface Artist{
    name: string
}

interface Props{
    artistId: number
}

const ArtistDetails: React.FC<Props> = ({artistId}) =>{
    const [artist, setArtist] = useState<Artist | null>(null)


    useEffect(() =>{
        const fetchArtist = async () => {
            try{
                const data = await getArtistById(artistId)
                setArtist(data)
            }catch(error){
                console.error("erro ao buscar o artista", error)
            }
        }


        fetchArtist()
    }, [artistId])

    if(!artist){
        return <div>Loading...</div>
    }

    return (
        <div>
            {artist ? (
                <div>
                    <h2>{artist.name}</h2>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    )
}

export default ArtistDetails